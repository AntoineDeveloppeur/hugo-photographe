"use client"

import formatError from "@/utils/formatError"
import { useRouter } from "next/navigation"

export default function useDeleteProject() {
  const Router = useRouter()

  async function deleteProject(_id: string): Promise<boolean> {
    try {
      if (!window.localStorage.getItem("token")) {
        Router.push("/connexion")
        throw new Error("Veuillez vous connecter pour supprimer un projet")
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/deleteProject/${_id}`,
        {
          method: "DELETE",
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
      return true
    } catch (error) {
      // Revoir le catch pour donner plus d'information à l'administrateur
      const errorMessage = formatError(error)
      window.alert(errorMessage)
      return false
    }
  }

  return { deleteProject }
}
