'use client'

import styles from './button.module.scss'
import { ButtonProps } from '@/types'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Button = ({ text, link }: ButtonProps) => {
    return (
        <motion.button
            className={styles.button}
            whileHover={{ backgroundColor: 'var(--background-button)' }}
            whileTap={{ scale: 0.9 }}
        >
            {link ? (
                <Link href={link}>
                    <p className={styles.button__p}>{text}</p>
                </Link>
            ) : (
                <p className={styles.button__p}>{text}</p>
            )}
        </motion.button>
    )
}

export default Button
