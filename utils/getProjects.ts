import fallbackProjects from "@/data/fallbackProjects.json"
import { Data } from "@/types"

// fonction utilisé parfois depuis le client ou depuis le server Next comme fonction serveur
// Deux url sont donc configuré car la manière d'atteindre l'API n'est pas la même
export default async function getProjects(): Promise<Data> {
  try {
    // fetch depuis le client fonctionnera ici
    if (typeof window !== "undefined") {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/getProjects`,
        { next: { revalidate: 2 } }
        // Could use an High revalidate value but a low value improve administrator UX when creating projects
        // Moreover, site load is going to be low, there is not risk of too many requests
      )

      if (!response.ok) {
        return fallbackProjects
      }
      const data: Data = await response.json()
      return data
    } else {
      // fonction serveur donc l'adresse de l'API n'est pas la même que depuis le client
      const response2 = await fetch(
        `${process.env.API_URL_FROM_SERVER}/api/project/getProjects`,
        { next: { revalidate: 2 } }
        // Could use an High revalidate value but a low value improve administrator UX when creating projects
        //
        // Moreover, site load is going to be low, there is not risk of too many requests
      )

      if (!response2.ok) {
        return fallbackProjects
      }

      const data2: Data = await response2.json()
      return data2
    }
  } catch {
    return fallbackProjects
  }
}
