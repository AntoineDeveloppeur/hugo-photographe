"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_js_1 = __importDefault(require("@/backend/models/user.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Créer d'abord l'objet contrôleur
const userCtrl = {
    signIn: (req, res) => {
        // Regarder si l'adresse email existe déjà ou non
        user_js_1.default.findOne({ email: req.body.email })
            .then((user) => {
            if (!user) {
                return res.status(401).json({ error: "l'utilisateur n'existe pas" });
            }
            bcrypt_1.default
                .compare(req.body.password, user.password)
                .then((valid) => {
                if (!valid) {
                    res.status(401).json({
                        error: "mot de pass incorect",
                    });
                }
                else {
                    if (!process.env.SECRET_PHRASE_TOKEN) {
                        return res.status(500).json({
                            error: "La phrase pour la génération du token pour jsonWebToken n'est pas définie",
                        });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jsonwebtoken_1.default.sign({ userId: user._id }, process.env.SECRET_PHRASE_TOKEN, // C'est la clé secrète qui permet de générer le token
                        { expiresIn: "48h" }),
                    });
                }
            })
                .catch((error) => {
                res.status(500).json({ error });
            });
        })
            .catch((error) => res.status(400).json({ error }));
    },
    modifyPassword: (req, res) => {
        // À implémenter - pour le moment juste un placeholder
        user_js_1.default.findOne({ email: req.body.email })
            .then((user) => {
            if (!user) {
                res.status(401).json({ message: "l'utilisateur n'existe pas" });
                return;
            }
            bcrypt_1.default
                .hash(req.body.password, 10)
                .then((hash) => {
                // Mise à jour du mot de passe de l'utilisateur avec le hash
                user_js_1.default.updateOne({ email: req.body.email }, { password: hash })
                    .then(() => res
                    .status(200)
                    .json({ message: "Mot de passe modifié avec succès" }))
                    .catch((error) => res.status(500).json({ error }));
            })
                .catch((error) => res.status(500).json({ error }));
        })
            .catch((error) => res.status(500).json({ error }));
    },
};
exports.default = userCtrl;
