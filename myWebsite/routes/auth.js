const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Mostrar página de registro
router.get('/register', (req, res) => {
  res.render('register');
});

// Procesar el registro
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.render('register', { error: 'Error al registrar el usuario' });
  }
});

// Mostrar página de login
router.get('/login', (req, res) => {
  res.render('login');
});

// Procesar el login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login', { error: 'Usuario no encontrado' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('login', { error: 'Contraseña incorrecta' });
    }
    // Guardar información de sesión
    req.session.userId = user._id;
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.render('login', { error: 'Error al iniciar sesión' });
  }
});

// Ruta de logout (opcional)
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
