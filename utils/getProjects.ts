import dataFallBack from "@/data/data.json"
import { Data } from "@/types"

// fonction utilisé parfois depuis le client ou depuis le server Next comme fonction serveur
// Deux url sont donc configuré car la manière d'atteindre l'API n'est pas la même
export default async function getProjects(): Promise<Data> {
  console.log("je suis dans getProjects")
  // fetch depuis le client fonctionnera ici
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/getProjects`,
      { next: { revalidate: 2 } }
      // Could use an High revalidate value but a low value improve administrator UX when creating projects
      // Moreover, site load is going to be low, there is not risk of too many requests
    )

    if (!response.ok) {
      console.log("je suis dans getProjects return data")
      return dataFallBack
    }
    const data: Data = await response.json()
    return data
  } catch {
    // fetch depuis le serveur Next fonctionnera ici
    try {
      console.log("je suis dans getProjects tentative avec API_URL_FROM_SERVER")
      // fonction serveur donc l'adresse de l'API n'est pas la même que depuis le client
      const response2 = await fetch(
        `${process.env.API_URL_FROM_SERVER}/api/project/getProjects`,
        { next: { revalidate: 2 } }
        // Could use an High revalidate value but a low value improve administrator UX when creating projects
        //
        // Moreover, site load is going to be low, there is not risk of too many requests
      )

      if (!response2.ok) {
        console.log("je suis dans getProjects !response2.ok")
        return dataFallBack
      }
      console.log("je suis dans getProjects return data2")

      const data2: Data = await response2.json()
      return data2
    } catch {
      console.log("je suis dans getProjects catch")

      return dataFallBack
    }
  }
}
