// fonction serveur
"use server"

import { revalidatePath } from "next/cache"
import formatError from "./formatError"

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
    // fonction serveur donc l'adresse de l'API n'est pas la même que depuis le client
    const response = await fetch(
      `${process.env.API_URL_FROM_SERVER}/api/project/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      }
    )
    // si token a été modifié
    if (response.status === 403) {
      return {
        success: false,
        error: "Veuillez vous connecter pour enregistrer un projet",
        redirectPath: "/connexion",
      }
    }
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
    const errorMessage = formatError(error)

    return {
      success: false,
      error: `L'enregistrement a échoué, vérifier votre connexion internet puis contacter votre administrateur avec ce message d'erreur ${errorMessage}`,
      redirectPath: "/administrateur",
    }
  }
}
