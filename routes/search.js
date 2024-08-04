const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const { query, categorie, prix_min, prix_max } = req.query;
  try {
    const results = await Product.find({
      nom: new RegExp(query, 'i'),
      categorie: new RegExp(categorie, 'i'),
      prix: { $gte: prix_min || 0, $lte: prix_max || 10000 }
    });
    res.render('search', { results, query });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;


