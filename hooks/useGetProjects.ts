import dataFallBack from '@/data/data.json'
import { Data } from '@/types'
import getProjects from '@/utils/getProjects'
import { useState, useEffect } from 'react'

export default function useGetProjects() {
  // Récupérer les projets depuis MongoDB
  const [data, setData] = useState<typeof dataFallBack | Data>(dataFallBack)
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await getProjects()
        if (response.projects.length > 0) {
          setData(response)
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
      }
    }
    fetchProjects()
  }, [])
  return data
}
