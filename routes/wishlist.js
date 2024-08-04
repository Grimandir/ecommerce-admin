const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const { requireAuth } = require('../middlewares/auth');

// Route pour afficher la liste de souhaits
router.get('/', requireAuth, async (req, res) => {
    try {
        const wishlistItems = await Wishlist.find({ utilisateur_id: req.session.userId }).populate('produit_id');
        res.render('wishlist', { wishlistItems });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Route pour ajouter un produit à la liste de souhaits
router.post('/add', requireAuth, async (req, res) => {
    const { produit_id } = req.body;
    try {
        const newWishlistItem = new Wishlist({ utilisateur_id: req.session.userId, produit_id });
        await newWishlistItem.save();
        res.redirect('/wishlist');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Route pour supprimer un produit de la liste de souhaits
router.post('/delete/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    try {
        await Wishlist.findByIdAndDelete(id);
        res.redirect('/wishlist');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;



