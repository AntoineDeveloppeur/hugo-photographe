import TitleProjectPage from '@/components/ui/atoms/TitleProjectPage/TitleProjectPage'
import styles from './ajouter-projet.module.scss'
import FormAjouterProjetV2 from '@/components/ui/organisms/FormAjouterProjetV2/FormAjouterProjetV2'

export default function AjouterProjet() {
    return (
        <section className={styles.ajout}>
            <div className={styles.ajout__largeScreen}>
                <div className={styles.ajout__largeScreen__titleWrapper}>
                    <TitleProjectPage text="Ajouter un projet" />
                </div>
                    <FormAjouterProjetV2/>
            </div>
        </section>
    )
}
