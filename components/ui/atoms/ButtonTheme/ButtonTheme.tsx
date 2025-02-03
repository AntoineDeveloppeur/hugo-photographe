"use client"

import styles from './button-theme.module.scss'
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

type Theme = "light" | "dark"

export default function ButtonTheme() {
    const [isOn, setIsOn] = useState(false)
    const [theme, setTheme] = useState<Theme>("dark")

    const toggleSwitch = () => {
        setIsOn(!isOn)
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
        console.log(theme)
    }

    useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme)
    }, [theme])

    return (
        <button
            className={styles.container}
            style={{
                justifyContent: "flex-" + (isOn ? "start" : "end"),
            }}
            onClick={toggleSwitch}
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