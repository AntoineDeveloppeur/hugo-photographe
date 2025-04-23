import styles from './input-file.module.scss'
import { RefObject, ChangeEvent } from 'react'

interface InputFileProps {
    label: string
    id: string
    fileInputRef: RefObject<HTMLInputElement>
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
    fileName: string
}

export default function InputFile({ label, id, fileInputRef, handleFileChange, fileName }: InputFileProps) {
    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={label} className={styles.inputWrapper__label}>Photo principale</label>
            <div className={styles.inputWrapper__fileInputWrapper}>
                <input
                    type="file"
                    id={id}
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className={styles.inputWrapper__fileInputWrapper__Input}
                />
                <div className={styles.inputWrapper__fileInputWrapper__Info}>
                    {fileName ? (
                        <span>{fileName}</span>
                    ) : (
                        <span>Aucun fichier sélectionné</span>
                    )}
                </div>
            </div>
        </div>
    )
}