'use client'

import { ButtonArrowProps } from '@/types'
import IconArrowRight from '../IconArrowRight/IconArrowRight'
import IconArrowLeft from '../IconArrowLeft/IconArrowLeft'
import styles from './button-arrow.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type RippleState = {
    x: number
    y: number
    isAnimating: boolean
} | null

const ButtonArrow = ({ text, direction }: ButtonArrowProps) => {
    const [ripple, setRipple] = useState<RippleState>(null)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget
        const rect = button.getBoundingClientRect()
        
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        setRipple({ x: x-47, y: y-48, isAnimating: true })
    }

    return (
        <motion.button 
            onClick={handleClick}
            whileHover={{backgroundColor: 'var(--background-button-second)' }}
            whileTap={{ scale: 0.9 }}
            className={styles.button}
        >
            <AnimatePresence>
                {ripple && ripple.isAnimating && (
                    <motion.span
                        className={styles.ripple}
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: 100,
                            height: 100,
                        }}
                        initial={{ 
                            scale: 0,
                            opacity: 0.6,
                        }}
                        animate={{ 
                            scale: 1,
                            opacity: 0,
                        }}
                        transition={{ 
                            duration: 0.4,
                            ease: "easeOut"
                        }}
                        onAnimationComplete={() => {
                            setRipple(null)
                        }}
                    />
                )}
            </AnimatePresence>
            {text && <p className={styles.button__p}>{text}</p>}
            {direction === 'left' ? <IconArrowLeft /> : <IconArrowRight />}
        </motion.button>
    )
}

export default ButtonArrow
