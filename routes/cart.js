const express = require('express');
const router = express.Router();
const db = require('../utlis/db');
const createCheckoutSession = require('../utils/stripe');
const sendMail = require('../utils/mailer');

// Middleware pour gérer le panier dans la session
router.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
});

// Route pour afficher le panier
router.get('/', (req, res) => {
    const cart = req.session.cart;
    const total = cart.reduce((sum, item) => sum + item.prix * item.quantite, 0);
    res.render('cart', { cart, total });
});

// Route pour ajouter un produit au panier
router.post('/add', async (req, res) => {
    const { id, quantite } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM produits WHERE id = ?', [id]);
        const produit = rows[0];
        if (produit) {
            const item = req.session.cart.find(item => item.id == id);
            if (item) {
                item.quantite += parseInt(quantite);
            } else {
                req.session.cart.push({ ...produit, quantite: parseInt(quantite) });
            }
        }
        res.redirect('/cart');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Route pour supprimer un produit du panier
router.post('/remove', (req, res) => {
    const { id } = req.body;
    req.session.cart = req.session.cart.filter(item => item.id != id);
    res.redirect('/cart');
});

// Route pour passer à la caisse
router.post('/checkout', async (req, res) => {
    const { utilisateur_id } = req.session;
    const cart = req.session.cart;

    try {
        const [user] = await db.query('SELECT email FROM utilisateurs WHERE id = ?', [utilisateur_id]);
        const checkoutUrl = await createCheckoutSession(cart, user[0].email);
        res.redirect(checkoutUrl);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;


