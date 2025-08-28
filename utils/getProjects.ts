import dataFallBack from "@/data/data.json"
import { Data } from "@/types"

export default async function getProjects(): Promise<Data> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/getProjects`,
      { next: { revalidate: 2 } }
      // Could use an High revalidate value but a low value improve administrator UX when creating projects
    )

    if (!response.ok) {
      return dataFallBack
    }
    const data: Data = await response.json()
    return data
  } catch {
    return dataFallBack
  }
}
