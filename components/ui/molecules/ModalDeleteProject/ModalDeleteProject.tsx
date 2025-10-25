import styles from "./modal-delete-project.module.scss"
import { ModalDeleteProjectProps } from "@/types"
import Modal from "../../atoms/Modal/Modal"
import { useState } from "react"
import Paragraphes from "../../atoms/Paragraphes/Paragraphes"
import Button from "../../atoms/Button/Button"
import ButtonSecondary from "../../atoms/ButtonSecondary/ButtonSecondary"
import Loader from "../../atoms/Loader/Loader"
import useDeleteProject from "@/hooks/useDeleteProject"

type modalStateType = "CONFIRMING" | "DELETING" | "DELETIONSUCCESS"

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
    const success = await deleteProject(_id as string)
    if (success) {
      setModalState("DELETIONSUCCESS")
    }
    // Fails are handled by useDeleteProject
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
    </Modal>
  )
}
