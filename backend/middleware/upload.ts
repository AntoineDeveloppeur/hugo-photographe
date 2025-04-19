import { IncomingForm, Fields } from 'formidable'
import { S3Client, PutObjectCommand, ObjectCannedACL} from '@aws-sdk/client-s3'
import fs from 'fs'
import { Request } from 'express'

// Configuration du client S3
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }

})

// Interface pour les fichiers téléchargés
interface FormidableFile {
    filepath: string
    originalFilename: string
    mimetype: string
    [key:string]: any;
}

interface ParsedForm {
    fields: Fields
    files: {
        [key: string]: FormidableFile
    }
}

//Fonction pour télécharger un fichier sur S3
export default async function uploadToS3(file: FormidableFile, prefix: string = ''): Promise<string> {
    // Lecture du contenu du fichier
    console.log('démarre la function uploadToS3')
    try {

        const fileContent = fs.readFileSync(file.filepath)
        console.log('fileContent généré')
        
        // Génération d'un nom de fichier unique
        const key = `${prefix ? prefix + '/' : ''}${Date.now()}-${file.originalFilename}`
        console.log('variable key défini')

        // Paramètres pour l'upload
        const uploadParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
            Body: fileContent,
            ContentType: file.mimetype,
            ACL: ObjectCannedACL.public_read
        }
        console.log('uploadParams déifni')


        // Envoi du fichier à S3

        await s3Client.send(new PutObjectCommand(uploadParams))

        // Retourne l'URL du fichier télécahrgé
        return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
    } catch(error) {
        console.log( error)
    }
}

// Fonction pour parser le formulaire
export async function parseForm(req: Request): Promise<ParsedForm> {
        
    return new Promise((resolve, reject) => {
        try {
            console.log('Création du formulaire formidable');
            // Nouvelle façon d'utiliser formidable (v3+)
            const form = new IncomingForm({
                keepExtensions: true,
                multiples: true,
                maxFileSize: 200 * 1024 * 1024, // 200MB
            });
            
            console.log('Parsing du formulaire...');
            form.parse(req, (err, fields, files) => {
                if (err) {
                    return reject(err);
                }
                
                console.log('Fichiers reçus:', Object.keys(files));
                
                resolve({
                    fields,
                    files: files as unknown as { [key: string]: FormidableFile}
                });
            });
        } catch (error) {
            console.error('Exception dans parseForm:', error);
            reject(error);
        }
    });
}