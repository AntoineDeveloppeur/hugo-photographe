import styles from './succesAjoutProjet.module.scss'
import TitleProjectPage from '@/components/ui/atoms/TitleProjectPage/TitleProjectPage'
import Paragraphes from '@/components/ui/molecules/Paragraphes/Paragraphes'
import Button from '@/components/ui/atoms/Button/Button'

export default function Connexion() {
    return (
        <section className={styles.succes}>
            <div className={styles.succes__largeScreen}>
                <div className={styles.succes__largeScreen__titleWrapper}>
                    <TitleProjectPage text="Succès !" />
                </div>
                <div className={styles.succes__largeScreen__titleWrapper}>
                    <TitleProjectPage text="Le projet a bien été ajouté à la base de donnée" />
                </div>
                <div className={styles.succes__largeScreen__buttons}>
                    <Button text="Retourner aux projet" link="/#Projects" />
                    <Button text="Ajouter un autre projet" link="/ajouterProjet" />
                </div>
            </div>
        </section>
    )
}
