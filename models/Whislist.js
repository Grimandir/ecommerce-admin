const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    utilisateur_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    produit_id: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
});

module.exports = mongoose.model('Wishlist', WishlistSchema);

