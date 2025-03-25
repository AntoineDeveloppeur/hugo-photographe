import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
// Gestion des erreurs d'unicité sans plugin externe
userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error('Cette adresse email est déjà utilisée'));
    }
    else {
        next(error);
    }
});
// Utilisation de la syntaxe ES modules pour l'export
const User = mongoose.model('User', userSchema);
export default User;
