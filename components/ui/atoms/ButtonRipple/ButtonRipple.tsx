'use client'

import styles from './button-ripple.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type ButtonRippleProps = {
    text: string
    onClick?: () => void
}

export default function ButtonRipple({ text, onClick }: ButtonRippleProps) {
    const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget
        const rect = button.getBoundingClientRect()
        
        // Calculer la position relative à l'élément lui-même
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        
        setRipples(prev => [...prev, { x, y, id: Date.now() }])
        
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
            <AnimatePresence mode="popLayout">
                {ripples.map(({ x, y, id }) => (
                    <motion.span
                        key={id}
                        className={styles.ripple}
                        style={{
                            left: x-47,
                            top:  y-48,
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
                            setRipples(prev => prev.filter(ripple => ripple.id !== id))
                        }}
                    />
                ))}
            </AnimatePresence>
            <p className={styles.button__p}>{text}</p>
        </motion.button>
    )
}
