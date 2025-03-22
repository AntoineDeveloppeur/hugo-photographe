'use client'

import styles from './buttonBig.module.scss'
import { ButtonProps } from '@/types'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ButtonBig = ({ text, link, onclick }: ButtonProps) => {
    return (
        <motion.button
        className={styles.button}
        whileHover={{ backgroundColor:  'var(--background-button-second)' }}
        whileTap={{ scale: 0.9 }}
        onClick={onclick}>
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

export default ButtonBig
