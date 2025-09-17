"use client"

import styles from "./button-Icon.module.scss"
import { ButtonProps } from "@/types"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import IconAdd from "../IconAdd/IconAdd"
import IconDelete from "@/components/ui/atoms/IconDelete/IconDelete"

type RippleState = {
  x: number
  y: number
  isAnimating: boolean
} | null

export default function Button({
  text,
  onclick,
  type,
  disabled,
  icon,
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
      whileHover={{ backgroundColor: "var(--background-button)" }}
      whileTap={{ scale: 0.9 }}
      disabled={disabled ? disabled : false}
      type={type ? type : "button"}
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
      {icon === "add" && <IconAdd />}
      {icon === "delete" && (
        <IconDelete
          width={24}
          height={24}
        />
      )}
      <p className={styles.button__p}>{text}</p>
    </motion.button>
  )
}
