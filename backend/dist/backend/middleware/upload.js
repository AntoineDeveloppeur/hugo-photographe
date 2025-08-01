"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = uploadToS3;
exports.parseForm = parseForm;
const formidable_1 = require("formidable");
const client_s3_1 = require("@aws-sdk/client-s3");
const getS3Client_1 = __importDefault(require("@/backend/utils/getS3Client"));
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const resizePhoto_1 = require("@/backend/utils/resizePhoto");
const convertToWebp_1 = require("@/backend/utils/convertToWebp");
// Fonction pour télécharger un fichier sur S3
// prefix is the name of the bucket
async function uploadToS3(file, prefix = "") {
    try {
        const fileContent = fs_1.default.readFileSync(file.filepath);
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
        const s3Client = (0, getS3Client_1.default)();
        //@ts-ignore
        await s3Client.send(new client_s3_1.PutObjectCommand(uploadParams));
        // Retourne l'URL du fichier télécahrgé
        return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    }
    catch (error) {
        return error;
    }
}
// Fonction pour parser le formulaire
async function parseForm(req) {
    return new Promise((resolve, reject) => {
        try {
            const form = new formidable_1.IncomingForm({
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
                // Traitement des images
                try {
                    const processedFilesArray = await Promise.all(
                    // l'objet files ressemble à
                    // files = {
                    //  set1photo1: file[0]
                    //  set1photo2: file[0]
                    //}
                    Object.entries(files).map(async ([key, fileArray]) => {
                        // avec map je peux renvoyer
                        // [{key: file},{key2: file 2}]
                        // avec reduce je peux construire mon objet
                        // xx.reduce((object) => {
                        //  return {...acc, ...object}
                        //})
                        // J'obtient
                        // { key: file, key2: file 2}
                        const file = fileArray?.[0];
                        // Fail-fast: Si ce n'est pas une image, conserver le fichier original
                        if (!file.mimetype?.startsWith("image/")) {
                            return { [key]: file };
                        }
                        // Obtenir les métadonnées de l'image originale
                        const metadata = await (0, sharp_1.default)(file.filepath).metadata();
                        // Modifier la taille si metadata disponible
                        const resizedFile = metadata.width && metadata.height
                            ? await (0, resizePhoto_1.resizePhoto)(metadata, file)
                            : { ...file };
                        // Si c'est déjà un WebP, conserver le fichier original et s'assuré que l'extension est bien .webp
                        if (resizedFile?.mimetype === "image/webp") {
                            return {
                                [key]: {
                                    ...resizedFile,
                                    //@ts-ignore
                                    originalFilename: `${
                                    //@ts-ignore
                                    path_1.default.parse(resizedFile?.originalFilename).name
                                    //@ts-ignore
                                    }.webp`,
                                },
                            };
                        }
                        // Pour les autres types d'images, convertir en WebP
                        return { [key]: await (0, convertToWebp_1.convertToWebp)(resizedFile) };
                    }));
                    // Résoudre avec les fichiers traités
                    resolve({
                        fields,
                        files: processedFilesArray.reduce((acc, object) => {
                            return { ...acc, ...object };
                        }),
                        // files doit ressembler à
                        // files = {
                        //    set1photo1: file
                        //}
                    });
                }
                catch (conversionError) {
                    reject(new Error(`Erreur lors de la conversion des images: ${conversionError instanceof Error
                        ? conversionError?.message
                        : conversionError}`));
                }
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
