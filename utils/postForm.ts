// fonction serveur
"use server"

import { revalidatePath } from "next/cache"

interface PostForm {
  success: boolean
  error?: string
  redirectPath?: string
}

// Post le bodyFormData
export default async function postForm(
  form: BodyInit,
  token: string | null
): Promise<PostForm> {
  if (!token) {
    return {
      success: false,
      error: "Veuillez vous connecter pour enregistrer un projet",
      redirectPath: "/connexion",
    }
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      }
    )
    if (response.status === 403) {
      return {
        success: false,
        error: "Veuillez vous connecter pour enregistrer un projet",
        redirectPath: "/connexion",
      }
    }
    const data = await response.json()
    if (!response.ok) {
      return {
        success: false,
        error: data.error,
      }
    }

    // Permet d'enlever le cache des pages dynamiques pour permettre ISR
    revalidatePath("/projectPage")
    return {
      success: true,
      redirectPath: "/succesAjoutProjet",
    }
  } catch {
    return {
      success: false,
      error:
        "L'enregistrement a échoué, vérifier votre connexion internet puis contacter votre administrateur",
      redirectPath: "/administrateur",
    }
  }
}
