import { PutObjectCommand } from "@aws-sdk/client-s3"
import getS3Client from "@/backend/utils/getS3Client.js"
import fs from "fs"
import { FormidableFile } from "@/backend/types/index.js"

// Fonction pour télécharger un fichier sur S3
// prefix is the name of the bucket
export default async function uploadPhoto(
  file: FormidableFile,
  prefix: string = ""
): Promise<string | unknown> {
  try {
    const fileContent = fs.readFileSync(file.filepath)

    // Génération d'un nom de fichier unique
    const key = `${prefix ? prefix + "/" : ""}${Date.now()}-${
      file.originalFilename
    }`

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
    //@ts-ignore
    await s3Client.send(new PutObjectCommand(uploadParams))

    // Retourne l'URL du fichier télécahrgé
    return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
  } catch (error) {
    return error
  }
}
