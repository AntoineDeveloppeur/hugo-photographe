import Subtitle from '@/components/ui/atoms/Subtitle/Subtitle'
import TitleProjectPage from '@/components/ui/atoms/TitleProjectPage/TitleProjectPage'
import styles from './politiqueConfidentialite.module.scss'

export default function PolitiqueConfidentialite() {
    return (
        <section className={styles.politique}>
            <div className={styles.politique__largeScreen}>
                <div className={styles.politique__largeScreen__titleWrapper}>
                    <TitleProjectPage text="Politique de Confidentialité" />
                </div>
                <Subtitle text="Collecte de l'information" />
                <p className={styles.politique__largeScreen__p}>
                    Nous recueillons des informations lorsque vous remplissez le
                    formulaire de contact. Il s&apos;agit de votre nom, votre adresse
                    e-mail, votre numéro de téléphone s&apos;il est renseigné et
                    votre message.
                </p>
                <Subtitle text="Utilisation des informations" />

                <p className={styles.politique__largeScreen__p}>
                Ce site utilise Google reCAPTCHA pour prévenir les abus et le spam. reCAPTCHA collecte des données personnelles des utilisateurs, telles que les adresses IP, les informations du navigateur, et les comportements des utilisateurs, afin de déterminer si une interaction est légitime. Ces données sont soumises à la Politique de confidentialité et aux Conditions d&apos;utilisation de Google. En utilisant ce site, vous consentez au traitement des données vous concernant par Google dans les conditions et pour les finalités décrites ci-dessus.
                </p>
                <Subtitle text="Divulgation à des tiers" />
                <p className={styles.politique__largeScreen__p}>
                    Nous ne vendons, n&apos;échangeons et ne transférons pas vos
                    informations personnelles identifiables à des tiers.
                </p>
                <Subtitle text="Protection des informations" />
                <p className={styles.politique__largeScreen__p}>
                    Nous mettons en œuvre une variété de mesures de sécurité
                    pour préserver la sécurité de vos informations personnelles.
                    Seuls Lisa Tastevin et les développeur du site ont accès aux
                    informations personnelles identifiables. Les ordinateurs et
                    serveurs utilisés pour stocker des informations personnelles
                    identifiables sont conservés dans un environnement sécurisé.
                    Aucun cookie n&apos;est utilisé.
                </p>
                <Subtitle text="Modifier ou supprimer vos données" />
                <p className={styles.politique__largeScreen__p}>
                    A tout moment vous pouvez faire la demande de la
                    suppressions de vos données en contact Lisa Tastevin via le
                    formulaire de contact ou par email accessible depuis la page
                    d&apos;accueil.
                </p>
                <Subtitle text="Consentement" />
                <p className={styles.politique__largeScreen__p}>
                    En utilisant notre site, vous consentez à notre politique de
                    confidentialité.
                </p>
            </div>
        </section>
    )
}
