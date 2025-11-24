"use client"

import { Portfolio } from "@/types"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import getPorfolio from "@/utils/getPortfolio"
import fallbackPortfolio from "@/data/fallbackPortfolio.json"

type useGetPortfolioReturn = {
  isPortfolioFetching: boolean
  portfolio: Portfolio
  error: string | null
  setPortfolio: Dispatch<SetStateAction<Portfolio>>
}

export default function useGetPortfolio(): useGetPortfolioReturn {
  const [isPortfolioFetching, setIsPortfolioFetching] = useState<boolean>(true)
  const [portfolio, setPortfolio] = useState<Portfolio>(fallbackPortfolio)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const updateStateWithFetchPhoto = async () => {
      const { photos, error } = await getPorfolio()
      setIsPortfolioFetching(false)
      if (error) {
        setError(error)
      } else {
        setPortfolio(photos as Portfolio)
      }
    }
    updateStateWithFetchPhoto()
  }, [])

  return { isPortfolioFetching, portfolio, error, setPortfolio }
}
