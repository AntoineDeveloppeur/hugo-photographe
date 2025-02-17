'use client'

import styles from './button-ripple.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type ButtonRippleProps = {
    text: string
    onClick?: () => void
}

type RippleState = {
    x: number
    y: number
    isAnimating: boolean
} | null

export default function ButtonRipple({ text, onClick }: ButtonRippleProps) {
    const [ripple, setRipple] = useState<RippleState>(null)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget
        const rect = button.getBoundingClientRect()
        
        // Calculer la position relative à l'élément lui-même
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        setRipple({ x: x-47, y: y-48, isAnimating: true })
        
        if (onClick) {
            onClick()
        }
    }

    return (
        <motion.button
            className={styles.button}
            whileHover={{ backgroundColor: 'var(--background-button-second)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
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
            <p className={styles.button__p}>{text}</p>
        </motion.button>
    )
}
