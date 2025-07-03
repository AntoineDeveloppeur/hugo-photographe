import getS3Client from "./getS3Client.js"
import { DeleteObjectCommand } from "@aws-sdk/client-s3"

export default function deletePhotoDB(url: string): boolean {
  const s3Client = getS3Client()

  return true
}
