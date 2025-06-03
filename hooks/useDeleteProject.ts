'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function useDeleteProject() {

    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [ isSuccess, setIsSuccess ] = useState<boolean>(false)
    const Router = useRouter()

    async function deleteProject(_id: string) {
        try {
            if(!window.localStorage.getItem('token')) {
                Router.push('/connexion')
                throw new Error('Veuillez vous connecter')
            }
            setIsLoading(true)
            const responseJSON = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/deleteProject`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            },            
            body: JSON.stringify({_id: _id })
        })
        
        const response = await responseJSON.json()
        console.log('responseJSON.status',responseJSON.status)
        
        if(responseJSON.status === 403 || 401) {
                Router.push('/connexion')
                throw new Error(response.message)
            }
        if(!responseJSON.ok) {
            throw new Error('Contacter votre administrateur')
        }
        setIsLoading(false)     
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