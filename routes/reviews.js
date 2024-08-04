const express = require('express');
const router = express.Router();
const db = require('../db');

// Route pour soumettre un avis
router.post('/add', async (req, res) => {
    const { produit_id, utilisateur_id, note, commentaire } = req.body;
    try {
        await db.query('INSERT INTO avis (produit_id, utilisateur_id, note, commentaire) VALUES (?, ?, ?, ?)', [produit_id, utilisateur_id, note, commentaire]);
        res.redirect(`/categorie/${req.body.categorie}`);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;

