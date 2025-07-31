import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import path from "path";
export const convertToWebp = async (file) => {
    // Crée un chemin unique et changer l'extension
    const uniqueId = uuidv4();
    const webpFilePath = path.join(path.dirname(file.filepath), `${uniqueId}.webp`);
    // Convertir l'image en WebP
    await sharp(file.filepath)
        .webp({
        quality: 80,
        effort: 4, // Meilleur équilibre entre vitesse et compression
    })
        .toFile(webpFilePath);
    return {
        ...file,
        filepath: webpFilePath,
        originalFilename: `${file?.originalFilename ? path.parse(file.originalFilename).name : "image"}.webp`,
        mimetype: "image/webp",
    };
};
