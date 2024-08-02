const express = require('express');
const router = express.Router();
const db = require('../db');

// Route pour afficher la liste des utilisateurs
router.get('/', async (req, res) => {
  const [users] = await db.query('SELECT * FROM utilisateurs');
  res.json(users);
});

// Route pour ajouter un utilisateur
router.post('/add', async (req, res) => {
  const { nom, email, mot_de_passe } = req.body;
  const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
  await db.query('INSERT INTO utilisateurs (nom, email, mot_de_passe) VALUES (?, ?, ?)', [nom, email, hashedPassword]);
  res.redirect('/admin');
});

// Route pour modifier un utilisateur
router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, email, mot_de_passe } = req.body;
  const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
  await db.query('UPDATE utilisateurs SET nom = ?, email = ?, mot_de_passe = ? WHERE id = ?', [nom, email, hashedPassword, id]);
  res.redirect('/admin');
});

// Route pour supprimer un utilisateur
router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM utilisateurs WHERE id = ?', [id]);
  res.redirect('/admin');
});

module.exports = router;
