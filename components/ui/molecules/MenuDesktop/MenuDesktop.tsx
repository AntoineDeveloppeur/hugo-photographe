import styles from './menu-desktop.module.scss'
import Link from 'next/link'

const MenuDesktop = () => {
    return (
        <nav>
            <ul className={styles.chapters}>
                <li>
                    <Link href="/#Portfolio">
                        <p className={`${styles.chapter} ${styles.chapter__1}`}>
                            PORTFOLIO
                        </p>
                    </Link>
                </li>
                <li>
                    <Link href="/#Projects">
                        <p className={`${styles.chapter} ${styles.chapter__2}`}>
                            PROJETS
                        </p>
                    </Link>
                </li>
                <li>
                    <Link href="/#Contact">
                        <p className={`${styles.chapter} ${styles.chapter__3}`}>
                            CONTACT
                        </p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default MenuDesktop
