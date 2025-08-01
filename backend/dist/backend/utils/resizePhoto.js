"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizePhoto = exports.calculateResizeDimensions = void 0;
const uuid_1 = require("uuid"); // Pour générer des noms de fichiers uniques
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const calculateResizeDimensions = (width, height) => {
    const maxWidth = 3840;
    const maxHeight = 2160;
    if (width <= maxWidth && height <= maxHeight) {
        return { width: width, height: height };
    }
    const widthRatio = maxWidth / width;
    const heightRatio = maxHeight / height;
    const ratio = Math.min(widthRatio, heightRatio);
    return {
        width: Math.round(width * ratio),
        height: Math.round(height * ratio),
    };
};
exports.calculateResizeDimensions = calculateResizeDimensions;
const resizePhoto = async (metadata, file) => {
    const newDimensions = (0, exports.calculateResizeDimensions)(metadata.width, metadata.height);
    // Renvoie le fichier s'il est déjà aux bonnes dimenssions
    if (newDimensions.width === metadata.width &&
        newDimensions.height === metadata.height) {
        return { ...file, width: metadata.width, height: metadata.height };
    }
    // Crée un chemin unique
    const uniqueId = (0, uuid_1.v4)();
    const resizedFilePath = path_1.default.join(path_1.default.dirname(file.filepath), 
    // TODO: 'jpg' est pris arbitrairement, cela n'a pas d'incidence sur la suite
    // A travailler pour rendre le code plus propre
    `${uniqueId}.${metadata.format || "jpg"}`);
    await (0, sharp_1.default)(file.filepath)
        .resize(newDimensions.width, newDimensions.height)
        .toFile(resizedFilePath);
    return {
        ...file,
        filepath: resizedFilePath,
        width: newDimensions.width,
        height: newDimensions.height,
    };
};
exports.resizePhoto = resizePhoto;
