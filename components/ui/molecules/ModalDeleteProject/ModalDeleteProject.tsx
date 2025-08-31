import styles from "./modal-delete-project.module.scss"
import { ModalDeleteProjectProps } from "@/types"
import Modal from "../../atoms/Modal/Modal"
import { useState } from "react"
import Paragraphes from "../Paragraphes/Paragraphes"
import Button from "../../atoms/Button/Button"
import ButtonSecondary from "../../atoms/ButtonSecondary/ButtonSecondary"
import Loader from "../../atoms/Loader/Loader"
import useDeleteProject from "@/hooks/useDeleteProject"

type modalStateType =
  | "CONFIRMING"
  | "DELETING"
  | "DELETIONSUCCESS"
  | "DELETIONERROR"

export default function ModalDeleteProject({
  _id,
  title,
  isOpen,
  onClose,
}: ModalDeleteProjectProps) {
  const [modalState, setModalState] = useState<modalStateType>("CONFIRMING")
  const { deleteProject } = useDeleteProject()

  const handleYes = async () => {
    setModalState("DELETING")
    try {
      await deleteProject(_id)
      setModalState("DELETIONSUCCESS")
      // revalidateProjects()
    } catch {
      setModalState("DELETIONERROR")
    }
  }
  const handleNo = () => {
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
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
      {modalState === "DELETIONERROR" && (
        <Paragraphes
          texts={["Échec de la suppression, contacter votre administrateur"]}
        />
      )}
    </Modal>
  )
}
