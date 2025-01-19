import styles from './header-desktop.module.scss'
import LogoWithSignature from '../../molecules/LogoWithSignature/LogoWithSignature'
import Menu from '../../molecules/MenuDesktop/MenuDesktop'

const Header = () => {
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
                <div className={styles.header__largeScreen__MenuWrapper}>
                    <Menu />
                </div>
            </div>
        </header>
    )
}

export default Header
