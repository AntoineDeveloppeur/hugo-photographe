'use client'

import { ButtonArrowRightProps } from '@/types'
import IconArrowRight from '../IconArrowRight/IconArrowRight'
import styles from './button-arrow-right.module.scss'
import { motion } from 'framer-motion'

const ButtonArrowRight = ({ text }: ButtonArrowRightProps) => {
    return (
        <motion.button 
        onClick={() => {}}
        whileHover={{backgroundColor: 'var(--dark7)'}}
        whileTap={{ scale: 0.9 }}
        className={styles.button}>
            {text && <p className={styles.button__p}>{text}</p>}
            <IconArrowRight />
        </motion.button>
    )
}

export default ButtonArrowRight
