import TitleProjectPage from '@/components/ui/atoms/TitleProjectPage/TitleProjectPage'
import styles from './connexion.module.scss'
import FormConnexion from '@/components/ui/organisms/FormConnexion/FormConnexion'

export default function Connexion() {
    return (
        <section className={styles.connexion}>
            <div className={styles.connexion__largeScreen}>
                <div className={styles.connexion__largeScreen__titleWrapper}>
                    <TitleProjectPage text="Connexion" />
                    {/* <FormConnexion/> */}
                </div>
            </div>
        </section>
    )
}
