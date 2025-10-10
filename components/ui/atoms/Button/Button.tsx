"use client"

import styles from "./button.module.scss"
import { ButtonProps } from "@/types"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

type RippleState = {
  x: number
  y: number
  isAnimating: boolean
} | null

export default function Button({
  text,
  link,
  onclick,
  type = "button",
  disabled = false,
  children,
}: ButtonProps) {
  const [ripple, setRipple] = useState<RippleState>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setRipple({ x: x - 47, y: y - 48, isAnimating: true })

    if (onclick) {
      onclick()
    }
  }

  return (
    <motion.button
      className={styles.button}
      whileHover={{ backgroundColor: "var(--background-button-second)" }}
      whileTap={{ scale: 0.9 }}
      disabled={disabled ? disabled : false}
      type={type ? type : undefined}
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
              ease: "easeOut",
            }}
            onAnimationComplete={() => {
              setRipple(null)
            }}
          />
        )}
      </AnimatePresence>
      {children}
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
