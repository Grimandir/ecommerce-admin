const express = require('express');
const router = express.Router();
const mysqlConnection = require('../utils/db');

// Route pour afficher les catégories
router.get('/', async (req, res) => {
    try {
        const [categories] = await mysqlConnection.query('SELECT DISTINCT categorie FROM products');
        res.render('category', { title: 'Catégories', categories });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Route pour afficher les produits d'une catégorie spécifique
router.get('/:categorie', async (req, res) => {
    const { categorie } = req.params;
    try {
        const [products] = await mysqlConnection.query('SELECT * FROM products WHERE categorie = ?', [categorie]);
        res.render('category', { title: `Catégorie: ${categorie}`, products });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;


