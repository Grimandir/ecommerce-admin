const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db'); // Module pour gérer la connexion à la base de données

// Route pour afficher la page de connexion
router.get('/login', (req, res) => {
  res.render('login');
});

// Route pour gérer la connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const [user] = await db.query('SELECT * FROM administrateurs WHERE email = ?', [email]);
  if (user && await bcrypt.compare(password, user.mot_de_passe)) {
    req.session.userId = user.id;
    res.redirect('/admin');
  } else {
    res.redirect('/auth/login');
  }
});

// Route pour gérer la déconnexion
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
});

module.exports = router;
