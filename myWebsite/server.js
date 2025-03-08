require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Configurar EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("💾 Conectado a MongoDB");
}).catch(err => {
    console.error("Error al conectar a MongoDB:", err);
});

// Importar rutas de autenticación
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// Rutas principales
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

// Puerto de escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
