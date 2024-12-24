'use client'

import { ButtonProps } from '@/types'
import ArrowRight from '../IconArrowRight/IconArrowRight'
import styles from './button-arrow-right.module.scss'

const Button = ({ text }: ButtonProps) => {
    return (
        <button onClick={() => {}} className={styles.button}>
            {text && <p className={styles.button__p}>{text}</p>}
            <ArrowRight />
        </button>
    )
}

export default Button
