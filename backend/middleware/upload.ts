import { IncomingForm, Fields } from 'formidable'
import { S3Client, PutObjectCommand, ObjectCannedACL} from '@aws-sdk/client-s3'
import fs from 'fs'
import { Request } from 'express'

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
        const fileContent = fs.readFileSync(file.filepath)
        
        // Génération d'un nom de fichier unique
        const key = `${prefix ? prefix + '/' : ''}${Date.now()}-${file.originalFilename}`

        // Paramètres pour l'upload
        const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
            Body: fileContent,
            ContentType: file.mimetype,
            ACL: ObjectCannedACL.public_read
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
            form.parse(req, (err, fields, files) => {
                if (err) {
                    return reject(err);
                }
                if (!fields) {
                    return reject(new Error('formulaire vide'))
                }
                if (!files) {
                    return reject(new Error('formulaire sans fichier'))
                }
                
                resolve({
                    fields,
                    files: files as unknown as { [key: string]: FormidableFile}
                });
            });
        } catch (error) {
            reject(error);
        }
    });
}