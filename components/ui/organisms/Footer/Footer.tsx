import Link from 'next/link'
import styles from './footer.module.scss'
export default function Footer() {
    return (
        <section className={styles.footer}>
            <div className={styles.footer__largeScreen}>
                <p className={styles.footer__largeScreen__text}>
                    ©2024 Hugo Randez Photographe 
                </p>
                <Link
                    href="/mentions-legales"
                    className={styles.footer__largeScreen__link}
                >
                    | Mentions Légales | 
                </Link>
                <Link
                    href="/mentions-legales"
                    className={styles.footer__largeScreen__link}
                >
                    Politique de confidentialité 
                </Link>
                <Link
                    href="/mentions-legales"
                    className={styles.footer__largeScreen__link}
                >
                    | CGV | 
                </Link>
                <Link
                    href="https://antoinedeveloppeur.github.io/portfolio/"
                    className={styles.footer__largeScreen__link}
                >
                    Réalisé par Antoine Dev
                </Link>
            </div>
        </section>
    )
}
