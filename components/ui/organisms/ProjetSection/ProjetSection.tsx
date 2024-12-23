import styles from './projet-section.module.scss'
import Button from '@/components/ui/atoms/Button/Button'
import arrowRight from '@/public/arrow-right.svg'

export default function ProjetSection() {
    return (
        <section className={styles.projetSection}>
            <Button text="Tous les projets" />
            <Button text="Tous les projets" />
            <Button />
        </section>
    )
}
