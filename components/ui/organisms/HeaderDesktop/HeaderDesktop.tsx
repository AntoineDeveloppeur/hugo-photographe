import styles from './header-desktop.module.scss'
import LogoWithSignature from '../../molecules/LogoWithSignature/LogoWithSignature'
import MenuDesktop from '../../molecules/MenuDesktop/MenuDesktop'
import ThemeChanger from '../../molecules/ThemeChanger/ThemeChanger'

const HeaderDesktop = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__largeScreen}>
                <div
                    className={
                        styles.header__largeScreen__LogoWithSignatureWrapper
                    }
                >
                    <LogoWithSignature />
                </div>
                {/* <div className={styles.header__largeScreen__ThemeChangerWrapper}><ThemeChanger/></div> */}
                <div className={styles.header__largeScreen__MenuWrapper}>
                    <MenuDesktop />
                </div>
            </div>
        </header>
    )
}

export default HeaderDesktop
