"use client"

import styles from "./menu-mobile.module.scss"
import { motion } from "framer-motion"
import { useRef, useState } from "react"
import useCloseWhenClickOutside from "@/hooks/useCloseWhenClickOutside"
import ThemeChanger from "../ThemeChanger/ThemeChanger"
import useDimensions from "@/hooks/useDimensions"
import MenuItem from "@/components/ui/atoms/MenuItem/MenuItem"
import MenuToggle from "@/components/ui/atoms/MenuToggle/MenuToggle"

export default function MenuMobile() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { height } = useDimensions(containerRef)

  useCloseWhenClickOutside(containerRef, () => {
    if (isOpen) setIsOpen(false)
  })

  return (
    <div className={styles.container}>
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        custom={height}
        ref={containerRef}
        className={styles.nav}
      >
        <motion.div
          className={styles.background}
          variants={sidebarVariants}
        />
        <motion.ul
          className={styles.list}
          variants={navVariants}
        >
          <MenuItem
            text="Portfolio"
            icon="portfolio"
            link="/#Portfolio"
          />
          <MenuItem
            text="Projets"
            icon="book"
            link="/#Projects"
          />
          <MenuItem
            text="Contact"
            icon="phone"
            link="/#Contact"
          />
          <motion.div variants={itemVariants}>
            <ThemeChanger />
          </motion.div>
        </motion.ul>
        <MenuToggle toggle={() => setIsOpen(!isOpen)} />
      </motion.nav>
    </div>
  )
}

const navVariants = {
  open: {
    transition: { staggerChildren: 0.02, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.0, staggerDirection: -1 },
  },
}

const itemVariants = {
  open: {
    display: "block",
    zIndex: 1,
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1, velocity: -100 },
    },
  },
  closed: {
    display: "none",
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1 },
    },
  },
}

const sidebarVariants = {
  open: (height = 200) => ({
    clipPath: `circle(${height * 2 + 200}px at 210px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 155px 55px)",
    transition: {
      delay: 0.07,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
}
