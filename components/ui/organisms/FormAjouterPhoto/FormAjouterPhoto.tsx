"use client"

import InputFileForModifierPortfolio from "@/components/ui/molecules/InputFileForModifierPortfolio/InputFileForModifierPortfolio"
import formatError from "@/utils/formatError"
import React, { useRef } from "react"
import postPhoto from "@/utils/postPhoto"
import { useRouter } from "next/navigation"
import { PhotoData } from "@/types"
import { Dispatch, SetStateAction } from "react"

export default function FormAjouterPhoto({
  photos,
  setPortfolio,
}: {
  photos: PhotoData[]
  setPortfolio: Dispatch<SetStateAction<PhotoData[]>>
}) {
  const Router = useRouter()

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null
    if (file) {
      const newPhoto = await submit(file)
      console.log("newPhoto", newPhoto)
      setPortfolio([...photos, newPhoto as PhotoData])
    }
  }

  const submit = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append("photo", file)
      const token = window.localStorage.getItem("token")

      if (!token) {
        alert("Veuillez vous connecter")
        Router.push("/connexion")
      }

      const { data, error } = await postPhoto(token as string, formData)
      if (error) throw new Error(error)
      return data
    } catch (error) {
      const errorMessage = formatError(error)
      alert(`erreur lors de l'envoie du formulaire ${errorMessage}`)
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <form>
      <InputFileForModifierPortfolio
        id="1"
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
      />
    </form>
  )
}
