import styles from './menu.module.scss'
import Link from 'next/link'

export default function () {
    return (
        <nav>
            <ul className={styles.chapters}>
                <li>
                    <Link href="#">
                        <p className={`${styles.chapter} ${styles.chapter__1}`}>
                            PORTFOLIO
                        </p>
                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <p className={`${styles.chapter} ${styles.chapter__2}`}>
                            PROJETS
                        </p>
                    </Link>
                </li>
                <li>
                    <Link href="#">
                        <p className={`${styles.chapter} ${styles.chapter__3}`}>
                            CONTACT
                        </p>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
