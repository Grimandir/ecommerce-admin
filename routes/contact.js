const express = require('express');
const router = express.Router();

// Route pour la page de contact
router.get('/', (req, res) => {
    res.render('contact', { title: 'Contactez-nous' });
});

router.post('/', (req, res) => {
    const { nom, email, message } = req.body;
    // Logique pour traiter le message de contact, par exemple envoyer un email
    req.flash('success', 'Votre message a été envoyé avec succès.');
    res.redirect('/contact');
});

module.exports = router;


