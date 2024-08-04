const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mot_de_passe: { type: String, required: true }
});

// Hachage du mot de passe avant de sauvegarder
UserSchema.pre('save', async function (next) {
    if (this.isModified('mot_de_passe') || this.isNew) {
        this.mot_de_passe = await bcrypt.hash(this.mot_de_passe, 10);
    }
    next();
});

module.exports = mongoose.model('User', UserSchema);
