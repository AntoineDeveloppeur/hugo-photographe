import dataFallBack from '@/data/data.json'
import { useState, useEffect } from 'react'

export default function useGetProjects() {
    // Récupérer les projets depuis MongoDB
    const [data, setData] = useState(dataFallBack)
    useEffect(()=> {
        async function fetchProjects() {
            try {
                const responseJSON = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/getProjects`, {
                method: 'GET'
            })
            const response = await responseJSON.json()
            setData(response)     
            } catch (error) {
                const errorMessage = error instanceof Error
                ? error.message
                : String(error)
                alert(errorMessage)
            }
        }   
        fetchProjects()
    }, [])

    return data

}