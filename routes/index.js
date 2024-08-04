const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Route pour la page d'accueil
router.get('/', async (req, res) => {
    try {
        const promotions = await Product.find({ isPromotion: true });
        res.render('index', { promotions });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;
