import formatError from "@/utils/formatError"

export default async function fetchPortfolio() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/portfolio/getPortfolio`
    )
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error)
    }
    return { photos: data.photos, error: null }
  } catch (error) {
    const errorMessage = formatError(error)
    return { photos: null, error: errorMessage }
  }
}
