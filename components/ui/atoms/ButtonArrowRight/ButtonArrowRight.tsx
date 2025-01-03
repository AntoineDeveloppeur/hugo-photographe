'use client'

import { ButtonArrowRightProps } from '@/types'
import IconArrowRight from '../IconArrowRight/IconArrowRight'
import styles from './button-arrow-right.module.scss'

const Button = ({ text }: ButtonArrowRightProps) => {
    return (
        <button onClick={() => {}} className={styles.button}>
            {text && <p className={styles.button__p}>{text}</p>}
            <IconArrowRight />
        </button>
    )
}

export default Button
