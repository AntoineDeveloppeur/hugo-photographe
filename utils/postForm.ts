// fonction serveur
"use server"

import { revalidatePath } from "next/cache"

interface PostForm {
  success: boolean
  error?: string
  redirectPath?: string
}

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
    console.log("on arrive au fetch")

    const response = await fetch(
      `${process.env.SERVER_URL}/api/project/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      }
    )
    console.log("juste après fetch")

    // si token a été modifié
    if (response.status === 403) {
      return {
        success: false,
        error: "Veuillez vous connecter pour enregistrer un projet",
        redirectPath: "/connexion",
      }
    }
    console.log("if (response.status === 403) {")

    // les autres cas dont le nom du projet est déjà pris
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
  } catch (error) {
    console.log("error", error)

    return {
      success: false,
      error: `L'enregistrement a échoué, vérifier votre connexion internet puis contacter votre administrateur, ${error}`,
      redirectPath: "/administrateur",
    }
  }
}
