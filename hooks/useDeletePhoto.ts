"use client"

import { useRouter } from "next/navigation"

export default function useDeletePhoto() {
  const Router = useRouter()

  async function deletePhoto(_id: string): Promise<{ success: boolean }> {
    try {
      if (!window.localStorage.getItem("token")) {
        Router.push("/connexion")
        throw new Error("Veuillez vous connecter pour supprimer une photo")
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/deletePhoto/${_id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )

      const data = await response.json()

      if (response.status === 401) {
        Router.push("/connexion")
        throw new Error(data.message)
      } else if (!response.ok) {
        throw new Error(data.message)
      }
      return { success: true }
    } catch (error) {
      // Revoir le catch pour donner plus d'information à l'administrateur
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      window.alert(errorMessage)
      return { success: false }
    }
  }

  return { deletePhoto }
}
