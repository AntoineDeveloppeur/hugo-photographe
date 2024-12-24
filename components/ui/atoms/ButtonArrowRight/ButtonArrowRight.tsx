'use client'

import { ButtonArrowRightProps } from '@/types'
import ArrowRight from '../ArrowRight/ArrowRight'
import styles from './button-arrow-right.module.scss'

const Button = ({ text }: ButtonArrowRightProps) => {
    return (
        <button onClick={() => {}} className={styles.button}>
            {text && <p className={styles.button__p}>{text}</p>}
            <ArrowRight />
        </button>
    )
}

export default Button
