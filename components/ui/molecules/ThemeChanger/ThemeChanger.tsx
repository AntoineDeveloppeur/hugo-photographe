"use client"

import ButtonTheme from '../../atoms/ButtonTheme/ButtonTheme'
import styles from './theme-changer.module.scss'
import { useState, useEffect } from 'react'

type Theme = "light" | "dark"

export default function ThemeChanger() {
    const [theme, setTheme] = useState<Theme>("dark")
    const toggleSwitch = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
        console.log(theme)
    }

    
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
      }, [theme])

    return (
        <div className={styles.themeChanger} onClick={toggleSwitch}>
            <ButtonTheme theme={theme} />
            <p className={styles.themeChanger__p}>
                {theme === "light" ? "Mode sombre" : "Mode clair"}</p>
        </div>
    )
}