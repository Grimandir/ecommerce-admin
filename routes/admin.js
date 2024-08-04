const express = require('express');
const router = express.Router();
const mysqlConnection = require('../utils/db'); // Fichier utilitaire pour la connexion MySQL
const { MongoClient } = require('mongodb');
const { requireAdmin } = require('../middlewares/auth');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Route pour afficher le tableau de bord administrateur
router.get('/', requireAdmin, async (req, res) => {
    try {
        await client.connect();
        const database = client.db('ecommerce_statistics');
        const salesStatistics = database.collection('sales_statistics');

        const [userCount] = await mysqlConnection.query('SELECT COUNT(*) as count FROM users');
        const [productCount] = await mysqlConnection.query('SELECT COUNT(*) as count FROM products');
        const [orderCount] = await mysqlConnection.query('SELECT COUNT(*) as count FROM orders');
        const totalSales = await salesStatistics.aggregate([{ $group: { _id: null, total: { $sum: '$total_sales' } } }]).toArray();
        const unitsSold = await salesStatistics.aggregate([{ $group: { _id: null, total: { $sum: '$units_sold' } } }]).toArray();

        res.render('admin/admin', {
            userCount: userCount[0].count,
            productCount: productCount[0].count,
            orderCount: orderCount[0].count,
            totalSales: totalSales[0] ? totalSales[0].total.toString() : "0",
            unitsSold: unitsSold[0] ? unitsSold[0].total : 0
        });
    } catch (err) {
        console.error(err);
        res.redirect('/auth/login');
    } finally {
        await client.close();
    }
});

// Autres routes pour la gestion des utilisateurs, des produits et des commandes

module.exports = router;




