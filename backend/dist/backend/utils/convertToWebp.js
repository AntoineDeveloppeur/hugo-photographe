"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToWebp = void 0;
const uuid_1 = require("uuid");
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const convertToWebp = async (file) => {
    // Crée un chemin unique et changer l'extension
    const uniqueId = (0, uuid_1.v4)();
    const webpFilePath = path_1.default.join(path_1.default.dirname(file.filepath), `${uniqueId}.webp`);
    // Convertir l'image en WebP
    await (0, sharp_1.default)(file.filepath)
        .webp({
        quality: 80,
        effort: 4, // Meilleur équilibre entre vitesse et compression
    })
        .toFile(webpFilePath);
    return {
        ...file,
        filepath: webpFilePath,
        originalFilename: `${file?.originalFilename ? path_1.default.parse(file.originalFilename).name : "image"}.webp`,
        mimetype: "image/webp",
    };
};
exports.convertToWebp = convertToWebp;
