"use client"

import { PhotoVariableProps } from "@/types"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import getPorfolio from "@/utils/getPortfolio"
import fallbackPortfolio from "@/data/fallbackPortfolio.json"

type useGetPortfolioReturn = {
  isPortfolioFetching: boolean
  portfolio: PhotoVariableProps[]
  error: string | null
  setPortfolio: Dispatch<SetStateAction<PhotoVariableProps[]>>
}

export default function useGetPortfolio(): useGetPortfolioReturn {
  const [isPortfolioFetching, setIsPortfolioFetching] = useState<boolean>(true)
  const [portfolio, setPortfolio] =
    useState<PhotoVariableProps[]>(fallbackPortfolio)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const updateStateWithFetchPhoto = async () => {
      const { photos, error } = await getPorfolio()
      setIsPortfolioFetching(false)
      if (error) {
        setError(error)
      } else {
        setPortfolio(photos as PhotoVariableProps[])
      }
    }
    updateStateWithFetchPhoto()
  }, [])

  return { isPortfolioFetching, portfolio, error, setPortfolio }
}
