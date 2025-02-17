'use client'

import styles from './button.module.scss'
import { ButtonProps } from '@/types'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Button({ text, link, onClick }: ButtonProps) {
    return (
        <motion.button
            className={styles.button}
            whileHover={{ backgroundColor: 'var(--background-button-second)' }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
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
