import { v4 as uuidv4 } from "uuid" // Pour générer des noms de fichiers uniques
import path from "path"
import sharp from "sharp"

export const calculateResizeDimensions = (
  width: number,
  height: number
): { width: number; height: number } => {
  const maxWidth = 3840
  const maxHeight = 2160
  if (width <= maxWidth && height <= maxHeight) {
    return { width: width, height: height }
  }

  const widthRatio = maxWidth / width
  const heightRatio = maxHeight / height
  const ratio = Math.min(widthRatio, heightRatio)

  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  }
}
export type Metadata = {
  format?: string | undefined
  width: number
  height: number
}
type File = {
  filepath: string
  mimetype: string | null
  originalFilename: string | null
}
type Resize = Metadata & File

export const resizePhoto = async (
  metadata: Metadata,
  file: File
): Promise<Resize> => {
  const newDimensions = calculateResizeDimensions(
    metadata.width,
    metadata.height
  )
  // Renvoie le fichier s'il est déjà aux bonnes dimenssions
  if (
    newDimensions.width === metadata.width &&
    newDimensions.height === metadata.height
  ) {
    return { ...file, width: metadata.width, height: metadata.height }
  }

  // Crée un chemin unique
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
  return {
    ...file,
    filepath: resizedFilePath,
    width: newDimensions.width,
    height: newDimensions.height,
  }
}
