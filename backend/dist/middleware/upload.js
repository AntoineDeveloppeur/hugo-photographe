import { IncomingForm } from "formidable";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import getS3Client from "@/backend/utils/getS3Client.js";
import fs from "fs";
import sharp from "sharp";
import path from "path";
import { resizePhoto } from "../utils/resizePhoto.js";
import { convertToWebp } from "@/backend/utils/convertToWebp.js";
// Fonction pour télécharger un fichier sur S3
// prefix is the name of the bucket
export default async function uploadToS3(file, prefix = "") {
    try {
        const fileContent = fs.readFileSync(file.filepath);
        // Génération d'un nom de fichier unique
        const key = `${prefix ? prefix + "/" : ""}${Date.now()}-${file.originalFilename}`;
        // Paramètres pour l'upload
        const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
            Body: fileContent,
            ContentType: file.mimetype,
            // ACL: ObjectCannedACL.public_read
        };
        // Envoi du fichier à S3
        const s3Client = getS3Client();
        //@ts-ignore
        await s3Client.send(new PutObjectCommand(uploadParams));
        // Retourne l'URL du fichier télécahrgé
        return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    }
    catch (error) {
        return error;
    }
}
// Fonction pour parser le formulaire
export async function parseForm(req) {
    return new Promise((resolve, reject) => {
        try {
            const form = new IncomingForm({
                keepExtensions: true,
                multiples: true,
                maxFileSize: 200 * 1024 * 1024, // 200MB
            });
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    return reject(err);
                }
                if (!fields) {
                    return reject(new Error("formulaire vide"));
                }
                if (!files) {
                    return reject(new Error("formulaire sans fichier"));
                }
                const processedFiles = await processFiles(files);
                resolve({
                    fields,
                    files: processedFiles,
                });
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
export async function processFiles(files) {
    const processedFilesArray = await Promise.all(Object.entries(files).map(async ([key, fileArray]) => {
        const file = fileArray?.[0];
        // Fail-fast: Si ce n'est pas une image, lancer une erreur
        if (!file.mimetype?.startsWith("image/")) {
            throw new Error("La photo choisie n'est pas une image");
        }
        // Obtenir les métadonnées de l'image originale
        const metadata = await sharp(file.filepath).metadata();
        // Modifier la taille si metadata disponibles
        const resizedFile = metadata?.width && metadata?.height
            ? await resizePhoto(metadata, file)
            : { ...file };
        // Si c'est déjà un WebP, conserver le fichier original et s'assuré que l'extension est bien .webp
        if (resizedFile?.mimetype === "image/webp") {
            return {
                [key]: {
                    ...resizedFile,
                    //@ts-ignore
                    originalFilename: `${
                    //@ts-ignore
                    path.parse(resizedFile?.originalFilename).name
                    //@ts-ignore
                    }.webp`,
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
