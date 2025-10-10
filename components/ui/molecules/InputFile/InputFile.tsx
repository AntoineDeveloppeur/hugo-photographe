import styles from "./input-file.module.scss"
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
    <div className={styles.inputWrapper}>
      <div className={styles.inputWrapper__fileInputWrapper}>
        <input
          type="file"
          id={id}
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className={styles.inputWrapper__fileInputWrapper__input}
        />
      </div>
    </div>
  )
}
