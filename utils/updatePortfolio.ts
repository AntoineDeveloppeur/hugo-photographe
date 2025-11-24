import { Portfolio } from "@/types"
import formatError from "@/utils/formatError"

type PutPortfolioResult = {
  success: boolean
  error: string | null
}

export default async function updatePortfolio(
  token: string,
  portfolio: Portfolio
): Promise<PutPortfolioResult> {
  console.log("body", JSON.stringify(portfolio))
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/portfolio/update`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolio),
      }
    )

    const data = await response.json()

    if (!response.ok) throw new Error(data.error as string)
    return { success: true, error: null }
  } catch (error) {
    const errorMessage = formatError(error)
    return { success: false, error: errorMessage }
  }
}
