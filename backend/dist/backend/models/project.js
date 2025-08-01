"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    //Prendre en compte l'_id de mongoose pour répondre à une requête get
    // _id: { type: String },
    title: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    mainPhoto: {
        src: { type: Object, required: true },
        alt: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true },
    },
    textsAbovePhotos: { type: [String], required: false },
    photosSets: {
        type: [
            [
                {
                    src: { type: String, required: true },
                    alt: { type: String, required: true },
                    width: { type: Number, required: true },
                    height: { type: Number, required: true },
                },
            ],
        ],
    },
    textsBelowPhotos: { type: [String], required: false },
});
// Gestion des erreurs d'unicité sans plugin externe
projectSchema.post("save", function (error, doc, next) {
    if (error.name === "MongoServerError" && error.code === 11000) {
        next(new Error("Ce nom de projet est déjà utilisée"));
    }
    else {
        next(error);
    }
});
const Project = mongoose_1.default.model("Projet", projectSchema);
exports.default = Project;
