const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    nom: { type: String, required: true },
    description: { type: String, required: true },
    prix: { type: Number, required: true },
    categorie: { type: String, required: true },
    taille: { type: String, required: true },
    stock: { type: Number, required: true },
    image: { type: String }
});

module.exports = mongoose.model('Product', ProductSchema);

