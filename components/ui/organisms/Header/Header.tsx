import styles from './header.module.scss'
import LogoWithSignature from '../../molecules/LogoWithSignature/LogoWithSignature'
import Menu from '../../molecules/Menu/Menu'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.positionLogoWithSignature}>
                <LogoWithSignature />
            </div>
            <div className={styles.positionMenu}>
                <Menu />
            </div>
        </header>
    )
}
