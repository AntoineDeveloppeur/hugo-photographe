"use client"

import { ItemsProps } from "@/types"
import { useState, useEffect, Dispatch, SetStateAction } from "react"
import getPorfolioNewStructure from "@/utils/getPortfolioNewStructure"
import fallbackPortfolioNewStructure from "@/data/fallbackPortfolioNewStructure.json"

type useGetPortfolioReturn = {
  isPortfolioFetching: boolean
  portfolio: ItemsProps
  error: string | null
  setPortfolio: Dispatch<SetStateAction<ItemsProps>>
}

export default function useGetPortfolioNewStructure(): useGetPortfolioReturn {
  const [isPortfolioFetching, setIsPortfolioFetching] = useState<boolean>(true)
  const [portfolio, setPortfolio] = useState<ItemsProps>(
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
        setPortfolio(photos as ItemsProps)
      }
    }
    updateStateWithFetchPhoto()
  }, [])

  return { isPortfolioFetching, portfolio, error, setPortfolio }
}
