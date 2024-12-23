import styles from './projet-section.module.scss'
import Button from '@/components/ui/atoms/Button/Button'

export default function ProjetSection() {
    return (
        <section className={styles.projetSection}>
            <div className={styles.projetSection__largeScreen}>
                <Button text="Tous les projets" />
                <Button />
            </div>
        </section>
    )
}
