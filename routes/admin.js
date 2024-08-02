const express = require('express');
const router = express.Router();
const db = require('../db');

// Middleware pour vérifier l'authentification
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/auth/login');
  }
  next();
}

router.use(requireAuth);

// Route pour afficher le tableau de bord
router.get('/', async (req, res) => {
  const [users] = await db.query('SELECT COUNT(*) AS total FROM utilisateurs');
  const [products] = await db.query('SELECT COUNT(*) AS total FROM produits');
  const [orders] = await db.query('SELECT COUNT(*) AS total FROM commandes');
  res.render('admin', {
    users: users[0].total,
    products: products[0].total,
    orders: orders[0].total
  });
});

module.exports = router;
