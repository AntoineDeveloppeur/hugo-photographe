"use client"

import { Portfolio } from "@/types"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import getPorfolioNewStructure from "@/utils/getPortfolio"
import fallbackPortfolioNewStructure from "@/data/fallbackPortfolioNewStructure.json"

type useGetPortfolioReturn = {
  isPortfolioFetching: boolean
  portfolio: Portfolio
  error: string | null
  setPortfolio: Dispatch<SetStateAction<Portfolio>>
}

export default function useGetPortfolioNewStructure(): useGetPortfolioReturn {
  const [isPortfolioFetching, setIsPortfolioFetching] = useState<boolean>(true)
  const [portfolio, setPortfolio] = useState<Portfolio>(
    fallbackPortfolioNewStructure
  )
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const updateStateWithFetchPhoto = async () => {
      const { photos, error } = await getPorfolioNewStructure()
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
