import Subtitle from '../../atoms/Subtitle/Subtitle'
import Title from '../../atoms/Title/Title'
import styles from './projet-section.module.scss'
import Button from '@/components/ui/atoms/Button/Button'

export default function ProjetSection() {
    return (
        <section className={styles.projetSection}>
            <div className={styles.projetSection__largeScreen}>
                <div className={styles.projetSection__largeScreen__top}>
                    <div
                        className={
                            styles.projetSection__largeScreen__top__TitleSubtitle
                        }
                    >
                        <Title text="PROJETS" />
                        <Subtitle text="VOYAGEZ A TRAVERS MES PROJETS" />
                    </div>
                    <Button text="Tous les projets" />
                </div>
            </div>
        </section>
    )
}
