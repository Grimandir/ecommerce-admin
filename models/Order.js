const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    utilisateur_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    produits: [{
        produit_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantite: { type: Number, required: true },
        prix: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    statut: { type: String, required: true, default: 'En attente' }
});

module.exports = mongoose.model('Order', OrderSchema);

