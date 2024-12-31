'use client'

import styles from './button.module.scss'
import { ButtonProps } from '@/types'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Button = ({ text, link }: ButtonProps) => {
    return (
        <motion.button
            onClick={() => {}}
            whileHover={{ scale: 0.5 }}
            className={styles.button}
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
