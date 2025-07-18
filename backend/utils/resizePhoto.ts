import { v4 as uuidv4 } from "uuid" // Pour générer des noms de fichiers uniques
import path from "path"
import sharp from "sharp"

export const calculateResizeDimensions = (width: number, height: number) => {
  const maxWidth = 3840
  const maxHeight = 2160
  if (width <= maxWidth && height <= maxHeight) {
    return { width, height }
  }

  const widthRatio = maxWidth / width
  const heightRatio = maxHeight / height
  const ratio = Math.min(widthRatio, heightRatio)

  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  }
}

type resizePhoto = {
  metadata: { format?: string | undefined }
  file: { filepath: string; mimetype: string; originalFilename: string }
  newDimensions: { width: number; height: number }
}

export const resizePhoto = async ({
  metadata,
  file,
  newDimensions,
}: resizePhoto) => {
  const uniqueId = uuidv4()
  const resizedFilePath = path.join(
    path.dirname(file.filepath),
    // TODO: 'jpg' est pris arbitrairement, cela n'a pas d'incidence sur la suite
    // A travailler pour rendre le code plus propre
    `${uniqueId}.${metadata.format || "jpg"}`
  )
  await sharp(file.filepath)
    .resize(newDimensions.width, newDimensions.height)
    .toFile(resizedFilePath)
  return { ...file, filepath: resizedFilePath }
}
