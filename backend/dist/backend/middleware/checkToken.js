"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = checkToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function checkToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Authentification requise" });
    }
    const token = authHeader.split(' ')[1];
    if (!process.env.SECRET_PHRASE_TOKEN) {
        return res.status(500).json({ message: "variable d'environnement manquante: jwt secret phrase" });
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.SECRET_PHRASE_TOKEN);
        next();
        return;
    }
    catch (error) {
        return res.status(403).json({ message: "Vous n'êtes pas autorisé, veuillez vous connecter. Si le problème persiste, contacter votre administrateur web", error: error });
        // Ajouter au frontend la redirection vers la page de connexion
    }
}
