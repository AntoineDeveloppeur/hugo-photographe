"use client"

import styles from "./delete-option.module.scss"
import IconDelete from "../../atoms/IconDelete/IconDelete"
import { useState } from "react"
import Modal from "../../atoms/Modal/Modal"
import Paragraphes from "../../atoms/Paragraphes/Paragraphes"
import Button from "../../atoms/Button/Button"
import ButtonSecondary from "../../atoms/ButtonSecondary/ButtonSecondary"
import Loader from "../../atoms/Loader/Loader"
import useDeleteProject from "@/hooks/useDeleteProject"
import useDeletePhoto from "@/hooks/useDeletePhoto"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import { deleteURL, findPositionOfURL } from "@/utils/portfolioDataOperation"
import { Items } from "@/types/index"

interface DeleteOptionTypes {
  id: string
  title?: string
  setItems?: Dispatch<SetStateAction<Items>>
}

type modalStateType = "CONFIRMING" | "DELETING" | "DELETIONSUCCESS"

export default function DeleteOption({
  id,
  title,
  setItems,
}: DeleteOptionTypes) {
  const Router = useRouter()

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const handleDelete = () => {
    setIsModalOpen(true)
  }
  const deleteType =
    id.split("").slice(0, 4).join("") == "http" ? "photo" : "project"

  const [modalState, setModalState] = useState<modalStateType>("CONFIRMING")

  const { deleteProject } = useDeleteProject()
  const { deletePhoto } = useDeletePhoto()

  const handleYes = async () => {
    setModalState("DELETING")
    console.log("je suis handleYes) { ")
    console.log("setItems", setItems)
    if (deleteType === "project") {
      console.log("deleteType", deleteType)
      const success = await deleteProject(id)
      if (success) setModalState("DELETIONSUCCESS")
      // Fails are handled by useDeleteProject
    }
    if (deleteType === "photo" && setItems) {
      // const { success } = await deletePhoto(id)
      // if (success && setItems) {
      // Utiliser la fonction updater pour filtrer la photo supprimée
      console.log('je suis a if (deleteType === "photo" && setItems) { ')
      setItems((prevItems: Items) => {
        console.log("je suis a  setItems((prevItems: any) => {")
        const { column, index } = findPositionOfURL(id, prevItems)
        if (index === null || !column) return prevItems
        return deleteURL(prevItems, column, index)
      })

      setModalState("DELETIONSUCCESS")
      // }
      // Fails are handled by useDeletePhoto
    }
  }
  const handleNo = () => {
    if (deleteType === "project") window.location.href = "/supprimerProjet"
    if (deleteType === "photo") {
      setModalState("CONFIRMING")
      setIsModalOpen(false)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    if (deleteType === "project") Router.push("/supprimerProjet")
  }
  return (
    <>
      <div
        className={styles.deleteOption__deleteWrapper}
        onClick={handleDelete}
      >
        <IconDelete
          width={96}
          height={96}
        />
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        >
          {modalState === "CONFIRMING" && (
            <div
              className={styles.deleteOption__deleteWrapper__buttonsWrapper}
              onClick={(e) => e.stopPropagation()}
            >
              <Paragraphes
                texts={[`Supprimer ${title || ""}définitivement ?`]}
              />
              <Button
                text="Oui"
                onclick={handleYes}
              />
              <ButtonSecondary
                text="Non"
                onclick={handleNo}
              />
            </div>
          )}
          {modalState === "DELETING" && <Loader />}
          {modalState === "DELETIONSUCCESS" && (
            <Paragraphes texts={["Suppression réussie"]} />
          )}
        </Modal>
      )}
    </>
  )
}
