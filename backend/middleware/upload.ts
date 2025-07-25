import { IncomingForm, Fields } from "formidable"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import getS3Client from "../utils/getS3Client.js"

import fs from "fs"
import { Request } from "express"
import sharp from "sharp"
import path from "path"
import { v4 as uuidv4 } from "uuid" // Pour générer des noms de fichiers uniques

// Interface pour les fichiers téléchargés
export interface FormidableFile {
  filepath: string
  originalFilename: string | null
  mimetype: string | null
  [key: string]: any
}

export interface ParsedForm {
  fields: Fields
  files: {
    [key: string]: FormidableFile
  }
}

//Fonction pour télécharger un fichier sur S3
export default async function uploadToS3(
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
          return reject(err)
        }
        if (!fields) {
          return reject(new Error("formulaire vide"))
        }
        if (!files) {
          return reject(new Error("formulaire sans fichier"))
        }

        // Convertir les images en WebP
        const processedFiles: { [key: string]: FormidableFile } = {}
        try {
          await Promise.all(
            Object.entries(files).map(async ([key, fileArray]) => {
              const file = (fileArray as FormidableFile[])?.[0]

              // Fail-fast: Si ce n'est pas une image, conserver le fichier original
              if (!file.mimetype?.startsWith("image/")) {
                processedFiles[key] = file
                return
              }
              // Obtenir les métadonnées de l'image originale
              const metadata = await sharp(file.filepath).metadata()
              console.log("metadata", metadata)
              console.log("metadatda.width", metadata.width)

              // Si c'est déjà un WebP, conserver le fichier original
              if (file?.mimetype === "image/webp") {
                // Créer un nouvel objet file (immutable)
                processedFiles[key] = {
                  ...file,
                  //@ts-ignore
                  originalFilename: `${
                    //@ts-ignore
                    path.parse(file?.originalFilename).name
                    //@ts-ignore
                  }.webp`,
                  width: metadata.width,
                  height: metadata.height,
                }
                return
              }

              // Pour les autres types d'images, convertir en WebP
              const uniqueId = uuidv4()
              const webpFilePath = path.join(
                path.dirname(file.filepath),
                `${uniqueId}.webp`
              )

              // Convertir l'image en WebP
              await sharp(file.filepath)
                .webp({
                  quality: 80,
                  // Préserver les métadonnées importantes
                  effort: 4, // Meilleur équilibre entre vitesse et compression
                })
                .toFile(webpFilePath)

              // Créer un nouvel objet file (immutable)
              processedFiles[key] = {
                ...file,
                filepath: webpFilePath,
                originalFilename: `${
                  file?.originalFilename
                    ? path.parse(file.originalFilename).name
                    : "image"
                }.webp`,
                mimetype: "image/webp",
                width: metadata.width,
                height: metadata.height,
              }
            })
          )

          // Résoudre avec les fichiers traités
          resolve({
            fields,
            files: processedFiles,
          })
        } catch (conversionError) {
          reject(
            new Error(
              `Erreur lors de la conversion des images: ${
                conversionError instanceof Error
                  ? conversionError?.message
                  : conversionError
              }`
            )
          )
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}
