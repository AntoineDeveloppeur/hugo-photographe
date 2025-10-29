import sharp from "sharp";
import path from "path";
import { resizePhoto } from "../utils/resizePhoto.js";
import { convertToWebp } from "../utils/convertToWebp.js";
export default async function processPhotos(files) {
    const processedFilesArray = await Promise.all(Object.entries(files).map(async ([key, fileArray]) => {
        const file = fileArray?.[0];
        // Fail-fast: Si ce n'est pas une image, lancer une erreur
        if (!file.mimetype?.startsWith("image/")) {
            throw new Error("La photo choisie n'est pas une image");
        }
        // Obtenir les métadonnées de l'image originale
        const { width, height, format } = await sharp(file.filepath).metadata();
        // Modifier la taille si metadata disponibles
        const resizedFile = width && height
            ? await resizePhoto(width, height, format, file)
            : { ...file };
        // Si c'est déjà un WebP, conserver le fichier original et s'assuré que l'extension est bien .webp
        if (resizedFile?.mimetype === "image/webp") {
            return {
                [key]: {
                    ...resizedFile,
                    originalFilename: `${path.parse(resizedFile?.originalFilename).name}.webp`,
                },
            };
        }
        // Pour les autres types d'images, convertir en WebP
        return { [key]: await convertToWebp(resizedFile) };
    }));
    // Résoudre avec les fichiers traités
    return processedFilesArray.reduce((acc, object) => {
        return { ...acc, ...object };
    });
}
