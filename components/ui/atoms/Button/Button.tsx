'use client'

import { ButtonProps } from '@/types'
import ArrowRight from '../ArrowRight/ArrowRight'
import styles from './button.module.scss'

const Button = ({ text }: ButtonProps) => {
    return (
        <button onClick={() => {}} className={styles.button}>
            {text && <p className={styles.button__p}>{text}</p>}
            <ArrowRight />
        </button>
    )
}

export default Button
