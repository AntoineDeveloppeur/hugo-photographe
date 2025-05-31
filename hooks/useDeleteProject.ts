import { useState } from 'react'
import Router from 'next/router'

export default function useDeleteProject() {

    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ isSuccess, setIsSuccess ] = useState<boolean>(false)

    async function deleteProject(_id: string) {
        try {
            setIsLoading(true)
            const responseJSON = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/deleteProject`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },            
            body: JSON.stringify({_id: _id })
        })
        setIsLoading(false)
        if(!responseJSON.ok) { throw new Error('Erreur de la requête http')}

        const response = await responseJSON.json()
        console.log('response',response)
        if(response.status === 403) {
            alert("L'authentification est nécessaire pour supprimer un projet")
            Router.push('/connexion')
        }
        setIsSuccess(true)
        }
        catch (error) {
            const errorMessage = error instanceof Error
            ? error.message
            : String(error)
            alert(errorMessage)
        }
    }

    return { isLoading, isSuccess, deleteProject }
}