"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
// Gestion des erreurs d'unicité sans plugin externe
// Pas utilse pour l'instant car pas de création d'utilisateur en passant par le serveur
// userSchema.post('save', function(error: any, doc: any, next: any) {
//     if (error.name === 'MongoServerError' && error.code === 11000) {
//         next(new Error('Cette adresse email est déjà utilisée'));
//     } else {
//         next(error);
//     }
// });
// Utilisation de la syntaxe ES modules pour l'export
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
