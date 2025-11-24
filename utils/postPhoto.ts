import { PhotoData } from "@/types"
import formatError from "@/utils/formatError"

type postPhotoResult = {
  data: PhotoData | null
  error: string | null
}

export default async function postPhoto(
  token: string,
  form: FormData
): Promise<postPhotoResult> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/photo/upload`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      }
    )

    const { data, error } = await response.json()
    if (!response.ok) {
      throw new Error(error)
    } else {
      return {
        data: {
          id: data.id,
          column: "3",
          src: data.url,
          alt: "Photographie de Hugo Randez",
          width: data.width,
          height: data.height,
          priority: false,
        },
        error: null,
      }
    }
  } catch (error) {
    const errorMessage = formatError(error)
    return { data: null, error: errorMessage }
    // alert(`il y a eu un problème avec l'upload de la photo: ${errorMessage}`)
  }
}
