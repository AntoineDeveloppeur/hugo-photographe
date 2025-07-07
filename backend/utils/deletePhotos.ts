import getS3Client from "./getS3Client.js"
import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { ProjectsProps } from "../../types/index.js"

export async function deleteOnePhotoFromDB(url: string): Promise<boolean> {
  const s3Client = getS3Client()

  // Récupérer la clé de la photo à supprimer
  // récupérer le nom du bucket
  const urlWithoutProtocol = url.split("https://")[1]
  const bucketName = urlWithoutProtocol.split(".s3.")[0]

  const photoKey = url.split("amazonaws.com/")[1]

  const deleteParams = {
    Bucket: bucketName,
    Key: photoKey,
  }
  try {
    await s3Client.send(new DeleteObjectCommand(deleteParams))
  } catch {
    return false
  }

  return true
}

export default async function deletePhotos(
  project: ProjectsProps,
  deleteOnePhotoFromDB: (url: string) => Promise<boolean>
): Promise<boolean> {
  // Mise en forme des url
  const urlTable = [
    project.mainPhoto.src,
    ...project.photosSets.flat().map((photo) => photo.src),
  ]

  const response = await Promise.all(
    urlTable.map(async (url) => await deleteOnePhotoFromDB(url))
  )
  return response.every((element) => element === true)
}
