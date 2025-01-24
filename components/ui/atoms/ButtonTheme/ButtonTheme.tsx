"use client"

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
            className="toggle-container"
            style={{
                ...container,
                justifyContent: "flex-" + (isOn ? "start" : "end"),
            }}
            onClick={toggleSwitch}
        >
            <motion.div
                className="toggle-handle"
                style={handle}
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

/**
 * ==============   Styles   ================
 */

const container = {
    width: 100,
    height: 50,
    backgroundColor: "grey",
    borderRadius: 50,
    cursor: "pointer",
    display: "flex",
    padding: 10,
}

const handle = {
    width: 30,
    height: 30,
    backgroundColor: "#9911ff",
    borderRadius: "50%",
}