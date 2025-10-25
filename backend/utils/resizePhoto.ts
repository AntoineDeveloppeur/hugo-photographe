import { v4 as uuidv4 } from "uuid" // Pour générer des noms de fichiers uniques
import path from "path"
import sharp from "sharp"
import { File } from "@/backend/types/index"

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

export const resizePhoto = async (
  width: number,
  height: number,
  format: string | null,
  file: File
): Promise<File> => {
  const newDimensions = calculateResizeDimensions(width, height)
  // Renvoie le fichier s'il est déjà aux bonnes dimenssions
  if (newDimensions.width === width && newDimensions.height === height) {
    return { ...file, width: width, height: height }
  }

  // Crée un chemin unique
  const uniqueId = uuidv4()
  const resizedFilePath = path.join(
    path.dirname(file.filepath),
    // TODO: 'jpg' est pris arbitrairement, cela n'a pas d'incidence sur la suite
    // A travailler pour rendre le code plus propre
    `${uniqueId}.${format || "jpg"}`
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
