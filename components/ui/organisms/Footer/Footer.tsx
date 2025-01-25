import Link from 'next/link'
import styles from './footer.module.scss'

const Footer = () => {
    return (
        <section className={styles.footer}>
            <div className={styles.footer__largeScreen}>
                <p className={styles.footer__largeScreen__text}>
                    ©2024 Hugo Randez Photographe&ensp;|&ensp;
                <Link
                    href="/mentionsLegales"
                    className={styles.footer__largeScreen__link}
                    >
                    Mentions Légales&ensp;|&ensp;
                </Link>
                <Link
                    href="/politiqueConfidentialite"
                    className={styles.footer__largeScreen__link}
                    >
                    Politique de confidentialité&ensp;|&ensp;
                </Link>
                <Link
                    href="https://antoinedeveloppeur.github.io/portfolio/"
                    className={styles.footer__largeScreen__link}
                    >
                    Réalisé par Antoine Dev
                </Link>
                    </p>
            </div>
        </section>
    )
}

export default Footer
