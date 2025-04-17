import styles from './textarea.module.scss'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type TextareaType<T extends FieldValues> = {
    label?: string
    defaultValue?: string
    name: Path<T>
    register: UseFormRegister<T>
    error?: string
    rows?: number
}

export default function Textarea<T extends FieldValues>({label, name, defaultValue, register, error, rows} : TextareaType<T>) {
    return (
        <div className={styles.textareaWrapper}>
            {label && <label htmlFor={name} className={styles.textareaWrapper__label}>{label}</label>}
            <textarea 
                id={name} 
                defaultValue={defaultValue && defaultValue} 
                {...register(name)}
                rows={rows}
                className={styles.textareaWrapper__textarea}
            />
            {error && <p className={styles.textareaWrapper__p}>{error}</p>}
        </div>
    )
}
