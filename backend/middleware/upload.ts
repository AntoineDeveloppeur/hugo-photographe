import { IncomingForm, Fields } from 'formidable'
import { S3Client, PutObjectCommand, ObjectCannedACL} from '@aws-sdk/client-s3'
import fs from 'fs'
import { Request } from 'express'
import sharp from 'sharp';
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; // Pour générer des noms de fichiers uniques

// Configuration du client S3

const getS3Client = () => {
    if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
        throw new Error("aws region or credentials in .env are undefined")
    }
    return new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
    })
}


// Interface pour les fichiers téléchargés
export interface FormidableFile {
    filepath: string
    originalFilename: string
    mimetype: string
    [key:string]: any;
}

export interface ParsedForm {
    fields: Fields
    files: {
        [key: string]: FormidableFile
    }
}

//Fonction pour télécharger un fichier sur S3
export default async function uploadToS3(file: FormidableFile, prefix: string = ''): Promise<string | unknown> {
    try {
        console.log('file.filepath',file.filepath)
        const fileContent = fs.readFileSync(file.filepath)
        
        // Génération d'un nom de fichier unique
        const key = `${prefix ? prefix + '/' : ''}${Date.now()}-${file.originalFilename}`

        // Paramètres pour l'upload
        const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
            Body: fileContent,
            ContentType: file.mimetype,
            // ACL: ObjectCannedACL.public_read
        }

        // Envoi du fichier à S3
        const s3Client = getS3Client()
        await s3Client.send(new PutObjectCommand(uploadParams))

        // Retourne l'URL du fichier télécahrgé
        return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
    } catch(error) {
        return error
    }
}

// Fonction pour parser le formulaire
export async function parseForm(req: Request): Promise<ParsedForm> {
    return new Promise((resolve, reject) => {
        try {
            const form = new IncomingForm({
                keepExtensions: true,
                multiples: true,
                maxFileSize: 200 * 1024 * 1024, // 200MB
            })
            form.parse(req, async (err, fields, files) => {
                if (err) {
                    return reject(err);
                }
                if (!fields) {
                    return reject(new Error('formulaire vide'))
                }
                if (!files) {
                    return reject(new Error('formulaire sans fichier'))
                }                
                
                // Convertir les images en WebP
                const processedFiles: { [key: string]: FormidableFile } = {};
                try {
                    await Promise.all(
                        Object.entries(files).map(async ([key, fileArray]) => {
                            const file = fileArray[0];
                            
                            // Fail-fast: Si ce n'est pas une image, conserver le fichier original
                            if (!file.mimetype.startsWith('image/')) {
                                processedFiles[key] = file;
                                return;
                            }
                            
                            // Si c'est déjà un WebP, conserver le fichier original
                            if (file.mimetype === 'image/webp') {
                                processedFiles[key] = file;
                                return;
                            }
                            
                            // Pour les autres types d'images, convertir en WebP
                            const uniqueId = uuidv4();
                            const webpFilePath = path.join(
                                path.dirname(file.filepath),
                                `${uniqueId}.webp`
                            );
                            
                            // Obtenir les métadonnées de l'image originale
                            const metadata = await sharp(file.filepath).metadata();
                            
                            // Convertir l'image en WebP
                            await sharp(file.filepath)
                                .webp({ 
                                    quality: 80,
                                    // Préserver les métadonnées importantes
                                    effort: 4 // Meilleur équilibre entre vitesse et compression
                                })
                                .toFile(webpFilePath);
                            
                            // Créer un nouvel objet file (immutable)
                            console.log('webpFilePath',webpFilePath)
                            processedFiles[key] = {
                                ...file,
                                filepath: webpFilePath,
                                originalFilename: `${path.parse(file.originalFilename).name}.webp`,
                                mimetype: 'image/webp',
                                width: metadata.width,
                                height: metadata.height,
                            };
                        })
                    );
                    
                    // Résoudre avec les fichiers traités
                    console.log('processedFiles',processedFiles)
                    resolve({
                        fields,
                        files: processedFiles
                    });
                } catch (conversionError) {
                    reject(new Error(`Erreur lors de la conversion des images: ${conversionError.message}`));
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}