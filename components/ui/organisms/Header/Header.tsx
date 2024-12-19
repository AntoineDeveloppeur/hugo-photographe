import styles from './header.module.scss'
import LogoWithSignature from '../../molecules/LogoWithSignature/LogoWithSignature'
import Menu from '../../molecules/Menu/Menu'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.LogoWithSignatureWrapper}>
                <LogoWithSignature />
            </div>
            <div className={styles.MenuWrapper}>
                <Menu />
            </div>
        </header>
    )
}
