"use client"

import ButtonTheme from '../../atoms/ButtonTheme/ButtonTheme'
import styles from './theme-changer.module.scss'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export default function ThemeChanger() {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme, systemTheme} = useTheme()

    const toggleSwitch = () => {
        
    }

    
    useEffect(() => {
       setMounted(true)
      }, [])

    if (!mounted) return null

    const currentTheme = theme === "system" ? systemTheme : theme

    return (
        <div className={styles.themeChanger} onClick={() =>setTheme(() => (currentTheme === "dark" ? "light" : "dark"))}>
            <ButtonTheme theme={currentTheme} />
            <p className={styles.themeChanger__p}>
                {currentTheme === "light" ? "Mode sombre" : "Mode clair"}</p>
        </div>
    )
}