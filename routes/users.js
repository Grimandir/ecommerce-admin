const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../utlis/db');

// Route pour afficher la liste des utilisateurs
router.get('/', async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM utilisateurs');
        res.json(users);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Route pour ajouter un utilisateur
router.post('/add', async (req, res) => {
    const { nom, email, mot_de_passe } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        await db.query('INSERT INTO utilisateurs (nom, email, mot_de_passe) VALUES (?, ?, ?)', [nom, email, hashedPassword]);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Route pour modifier un utilisateur
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { nom, email, mot_de_passe } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        await db.query('UPDATE utilisateurs SET nom = ?, email = ?, mot_de_passe = ? WHERE id = ?', [nom, email, hashedPassword, id]);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Route pour supprimer un utilisateur
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM utilisateurs WHERE id = ?', [id]);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;


