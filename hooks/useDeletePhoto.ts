"use client"

import formatError from "@/utils/formatError"
import { useRouter } from "next/navigation"

export default function useDeletePhoto() {
  const Router = useRouter()

  async function deletePhoto(url: string): Promise<{ success: boolean }> {
    try {
      if (!window.localStorage.getItem("token")) {
        Router.push("/connexion")
        throw new Error("Veuillez vous connecter pour supprimer une photo")
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/photo/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: url }),
        }
      )

      const data = await response.json()
      //rgfrt
      if (response.status === 401) {
        Router.push("/connexion")
        throw new Error(data.error)
      } else if (!response.ok) {
        throw new Error(data.error)
      }
      return { success: true }
    } catch (error) {
      // Revoir le catch pour donner plus d'information à l'administrateur
      const errorMessage = formatError(error)
      window.alert(errorMessage)
      return { success: false }
    }
  }

  return { deletePhoto }
}
