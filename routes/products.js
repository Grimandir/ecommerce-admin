const express = require('express');
const router = express.Router();
const db = require('../db');

// Route pour afficher la liste des produits
router.get('/', async (req, res) => {
  const [products] = await db.query('SELECT * FROM produits');
  res.json(products);
});

// Route pour ajouter un produit
router.post('/add', async (req, res) => {
  const { nom, description, prix, categorie, taille, stock } = req.body;
  await db.query('INSERT INTO produits (nom, description, prix, categorie, taille, stock) VALUES (?, ?, ?, ?, ?, ?)', [nom, description, prix, categorie, taille, stock]);
  res.redirect('/admin');
});

// Route pour modifier un produit
router.post('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, description, prix, categorie, taille, stock } = req.body;
  await db.query('UPDATE produits SET nom = ?, description = ?, prix = ?, categorie = ?, taille = ?, stock = ? WHERE id = ?', [nom, description, prix, categorie, taille, stock, id]);
  res.redirect('/admin');
});

// Route pour supprimer un produit
router.post('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM produits WHERE id = ?', [id]);
  res.redirect('/admin');
});

module.exports = router;
