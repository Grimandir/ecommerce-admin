const express = require('express');
const router = express.Router();
const db = require('../utlis/db');

// Route pour afficher les commandes
router.get('/', async (req, res) => {
    try {
        const [orders] = await db.query('SELECT * FROM commandes');
        res.render('orders', { orders });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Route pour mettre à jour le statut de la commande
router.post('/update', async (req, res) => {
    const { id, statut } = req.body;
    try {
        await db.query('UPDATE commandes SET statut = ? WHERE id = ?', [statut, id]);
        res.redirect('/orders');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;


