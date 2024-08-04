const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const Product = require('../models/Product');
const { requireAdmin } = require('../middlewares/auth');

// Route pour ajouter un produit avec une image
router.post('/add', requireAdmin, upload.single('image'), async (req, res) => {
  const { nom, description, prix, categorie, taille, stock } = req.body;
  const image = req.file ? '/uploads/' + req.file.filename : '';
  try {
    const newProduct = new Product({ nom, description, prix, categorie, taille, stock, image });
    await newProduct.save();
    res.redirect('/admin/products');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});


