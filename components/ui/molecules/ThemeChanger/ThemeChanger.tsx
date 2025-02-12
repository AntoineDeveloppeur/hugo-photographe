"use client"

import ButtonTheme from '../../atoms/ButtonTheme/ButtonTheme'
import styles from './theme-changer.module.scss'
import { useTheme } from 'next-themes'

export default function ThemeChanger() {

    const {theme, setTheme, systemTheme} = useTheme()


    const currentTheme = theme === "system" ? systemTheme : theme

    return (
        <div className={styles.themeChanger} onClick={() =>setTheme(() => (currentTheme === "dark" ? "light" : "dark"))}>
            <ButtonTheme theme={currentTheme} />
            <p className={styles.themeChanger__p}>
                {currentTheme === "light" ? "Mode sombre" : "Mode clair"}</p>
        </div>
    )
}