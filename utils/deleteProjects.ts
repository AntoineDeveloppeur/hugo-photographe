import { useRouter } from "next/router"

export default async function deleteProject(_id: string) {
  const Router = useRouter()
  try {
    if (!window.localStorage.getItem("token")) {
      Router.push("/connexion")
      throw new Error("Veuillez vous connecter")
    }
    const responseJSON = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/deleteProject/${_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    )

    const response = await responseJSON.json()

    if (responseJSON.status === 403 || responseJSON.status === 401) {
      Router.push("/connexion")
      throw new Error(response.message)
    }
    if (!responseJSON.ok) {
      throw new Error("Contacter votre administrateur")
    }
  } catch {
    throw new Error("Contacter votre administrateur")
  }

  return deleteProject
}
