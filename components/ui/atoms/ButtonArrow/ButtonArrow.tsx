'use client'

import { ButtonArrowProps } from '@/types'
import IconArrowRight from '../IconArrowRight/IconArrowRight'
import IconArrowLeft from '../IconArrowLeft/IconArrowLeft'
import styles from './button-arrow.module.scss'
import { motion } from 'framer-motion'

const ButtonArrow = ({ text, direction }: ButtonArrowProps) => {
    return (
        <motion.button 
        onClick={() => {}}
        whileHover={{backgroundColor: 'var(--background-button-second)' }}
        whileTap={{ scale: 0.9 }}
        className={styles.button}>
            {text && <p className={styles.button__p}>{text}</p>}
            {direction === 'left' ? <IconArrowLeft /> : <IconArrowRight />}
        </motion.button>
    )
}

export default ButtonArrow
