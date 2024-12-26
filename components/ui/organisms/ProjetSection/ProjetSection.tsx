import Subtitle from '../../atoms/Subtitle/Subtitle'
import Title from '../../atoms/Title/Title'
import Card from '../../molecules/Card/Card'
import styles from './projet-section.module.scss'
import Button from '@/components/ui/atoms/ButtonArrowRight/ButtonArrowRight'

export default function ProjetSection() {
    // définir une constant qui dépend du nombre de projets
    // const projectsCount = nombre d'élément dans le tableau de données

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
                    {/* Ajouter une condition si le nprojetsCount est supérieur à 3 */}
                    <Button text="Tous les projets" />
                </div>
                <div className={styles.projetSection__largeScreen__cards}>
                    {/* Afficher le nombre de projets entre 1 et 3 */}
                    {/* Ajouter un état qui prends en compte si l'utilisateur à cliquer sur 
                    'voir tous les projets', Si c'est le cas afficher le nombre de projet max 6 */}
                    <Card />
                    <Card />
                    <Card />
                </div>
                {/* Si projetsCount > 6 alors afficher le sélectionneur de page */}
            </div>
        </section>
    )
}
