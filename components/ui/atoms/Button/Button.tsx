'use client'

import styles from './button.module.scss'
import { ButtonProps } from '@/types'
import Link from 'next/link'

const Button = ({ text, link }: ButtonProps) => {
    return (
        <button onClick={() => {}} className={styles.button}>
            {link ? (
                <Link href={link}>
                    <p className={styles.button__p}>{text}</p>
                </Link>
            ) : (
                <p className={styles.button__p}>{text}</p>
            )}
        </button>
    )
}

export default Button
