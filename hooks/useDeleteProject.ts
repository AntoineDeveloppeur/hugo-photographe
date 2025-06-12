'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { revalidateTag } from 'next/cache'

export default function useDeleteProject() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const Router = useRouter()

  async function deleteProject(_id: string) {
    try {
      if (!window.localStorage.getItem('token')) {
        Router.push('/connexion')
        throw new Error('Veuillez vous connecter')
      }
      setIsLoading(true)
      const responseJSON = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/deleteProject/${_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('token')}`,
          },
        }
      )

      const response = await responseJSON.json()

      if (responseJSON.status === 403 || responseJSON.status === 401) {
        Router.push('/connexion')
        throw new Error(response.message)
      }
      if (!responseJSON.ok) {
        throw new Error('Contacter votre administrateur')
      }
      setIsLoading(false)
      setIsSuccess(true)
      revalidateTag('ProjectData')
      setTimeout(() => Router.refresh(), 1000)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      alert(errorMessage)
    }
  }

  return { isLoading, isSuccess, deleteProject }
}
