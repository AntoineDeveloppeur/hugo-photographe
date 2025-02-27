"use client"

import styles from './button-theme.module.scss'
import { motion } from "framer-motion"


type Theme = "light" | "dark" | undefined

export default function ButtonTheme({ theme }: { theme: Theme }) {


    return (
        <button
            className={styles.container}
            style={{
                justifyContent: "flex-" + (theme === "light" ? "start" : "end"),
            }}
        >
            <motion.div
                className={styles.handle}
                layout
                transition={{
                    type: "spring",
                    visualDuration: 0.2,
                    bounce: 0.2,
                }}
            />
        </button>
    )
}