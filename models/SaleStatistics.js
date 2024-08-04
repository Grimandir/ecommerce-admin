const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;

async function getDatabase() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    return client.db('ecommerce_statistics');
}

async function getTotalSales() {
    const db = await getDatabase();
    const collection = db.collection('sales_statistics');
    const result = await collection.aggregate([{ $group: { _id: null, total: { $sum: '$total_sales' } } }]).toArray();
    return result[0] ? result[0].total : 0;
}

async function getUnitsSold() {
    const db = await getDatabase();
    const collection = db.collection('sales_statistics');
    const result = await collection.aggregate([{ $group: { _id: null, total: { $sum: '$units_sold' } } }]).toArray();
    return result[0] ? result[0].total : 0;
}

module.exports = {
    getTotalSales,
    getUnitsSold
};
