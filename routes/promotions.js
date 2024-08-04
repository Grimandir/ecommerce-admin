const express = require('express');
const router = express.Router();
const db = require('../utlis/db');

// Route pour afficher les promotions
router.get('/', async (req, res) => {
    try {
        const [produits] = await db.query('SELECT * FROM produits WHERE categorie = "Promotions"');
        res.render('promotions', { produits });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;
