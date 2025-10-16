"use client"

import dataFallBack from "@/data/data.json"
import { Data } from "@/types"
import getProjects from "@/utils/getProjects"
import { useState, useEffect } from "react"
import formatError from "@/utils/formatError"

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
        console.error(
          "Echec de la récupération des projets depuis l'API, message d'erreur:",
          formatError(error)
        )
        // le dataFallBack est utilisé
      }
    }
    fetchProjects()
  }, [])
  return data
}
