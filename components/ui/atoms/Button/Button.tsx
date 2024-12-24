'use client'

import { ButtonProps } from '@/types'
import styles from './button.module.scss'

const Button = ({ text }: ButtonProps) => {
    return (
        <button onClick={() => {}} className={styles.button}>
            <p className={styles.button__p}>{text}</p>
        </button>
    )
}

export default Button
