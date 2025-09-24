import { IncomingForm } from "formidable"
import { Request } from "express"
import { ParsedForm } from "@/backend/types/index.js"
import processPhotos from "@/backend/utils/processPhotos"

export default async function parseForm(req: Request): Promise<ParsedForm> {
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

        const processedFiles = await processPhotos(files)

        resolve({
          fields,
          files: processedFiles,
        })
      })
    } catch (error) {
      reject(error)
    }
  })
}
