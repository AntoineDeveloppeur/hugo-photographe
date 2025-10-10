import Button from "../../atoms/Button/Button"
import styles from "./input-file-for-modifier-portfolio.module.scss"
import { RefObject, ChangeEvent } from "react"

interface InputFileProps {
  id: string
  fileInputRef: RefObject<HTMLInputElement>
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function InputFile({
  id,
  fileInputRef,
  handleFileChange,
}: InputFileProps) {
  return (
    <>
      <Button
        text="Ajouter une photo"
        onclick={() => fileInputRef.current?.click()}
      />
      <input
        type="file"
        id={id}
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className={styles.input}
      />
    </>
  )
}
