import styles from "./delete-option.module.scss"
import IconDelete from "../../atoms/IconDelete/IconDelete"
import { useState } from "react"
import ModalDeleteProject from "../ModalDeleteProject/ModalDeleteProject"
import Modal from "../../atoms/Modal/Modal"
import Paragraphes from "../Paragraphes/Paragraphes"
import Button from "../../atoms/Button/Button"
import ButtonSecondary from "../../atoms/ButtonSecondary/ButtonSecondary"
import Loader from "../../atoms/Loader/Loader"
import useDeleteProject from "@/hooks/useDeleteProject"

interface DeleteOptionTypes {
  id: string
  title?: string
}

type modalStateType = "CONFIRMING" | "DELETING" | "DELETIONSUCCESS"

export default function DeleteOption({ id, title }: DeleteOptionTypes) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const handleDelete = () => {
    setIsModalOpen(true)
  }

  const deleteType =
    id.split("").slice(0, 4).join("") == "http" ? "photo" : "project"
  console.log("deleteType", deleteType)

  const [modalState, setModalState] = useState<modalStateType>("CONFIRMING")

  const { deleteProject } = useDeleteProject()

  const handleYes = async () => {
    setModalState("DELETING")
    if (deleteType === "project") {
      const success = await deleteProject(id)
      if (success) {
        setModalState("DELETIONSUCCESS")
      }
      // Fails are handled by useDeleteProject
    }
    if (deleteType === "photo") {
      //const success = await deletePhoto(id)
    }
  }
  const handleNo = () => {
    if (deleteType === "project") window.location.href = "/supprimerProjet"
    if (deleteType === "photo") {
      setModalState("CONFIRMING")
      setIsModalOpen(false)
    }
  }
  return (
    <>
      <div
        className={styles.cardWrapper__deleteWrapper}
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
          onClose={() => (window.location.href = "/supprimerProjet")}
        >
          {modalState === "CONFIRMING" && (
            <div
              className={styles.buttonsWrapper}
              onClick={(e) => e.stopPropagation()}
            >
              <Paragraphes texts={[`Supprimer ${title} définitivement ?`]} />
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
