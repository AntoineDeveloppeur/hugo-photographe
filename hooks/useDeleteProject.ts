import { useState, useEffect } from 'react'
import Router from 'next/router'

export default function useDeleteProject(_id: string) {

    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ isSuccess, setIsSuccess ] = useState<boolean>(false)

    useEffect(() => {
        async function deleteProject() {
            try {
                const responseJSON = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/project/deleteProject`, {
                method: 'DELETE',
                body: JSON.stringify({_id: _id })
            })
            setIsLoading(false)
            if(!responseJSON.ok) { throw new Error('Erreur de la requête http')}

            const response = responseJSON.json()
            //@ts-expect-error ddd
            if(response.status === 403) {
                alert("L'authentification est nécessaire pour supprimer un projet")
                Router.push('/connexion')
            }
            setIsSuccess(true)
            //@ts-expect-error ddd
            alert(response.message)
            }
            catch (error) {
                const errorMessage = error instanceof Error
                ? error.message
                : String(error)
                alert(errorMessage)
            }
        }
        deleteProject()
    },[])
    return { isLoading, isSuccess }
}