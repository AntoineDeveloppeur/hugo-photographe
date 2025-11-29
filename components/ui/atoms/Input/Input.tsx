import styles from "./input.module.scss"

type InputType = {
  label?: string
  defaultValue?: string | number
  name: string
  type: "email" | "password" | "text" | "number"
  register: any
  error?: string
}

export default function Input({
  label,
  name,
  type,
  defaultValue,
  register,
  error,
}: InputType) {
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label
          htmlFor={name}
          className={styles.inputWrapper__label}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        defaultValue={defaultValue && defaultValue}
        {...register(name)}
        type={type}
        className={styles.inputWrapper__input}
      />
      {error && <p className={styles.inputWrapper__p}>{error}</p>}
    </div>
  )
}
