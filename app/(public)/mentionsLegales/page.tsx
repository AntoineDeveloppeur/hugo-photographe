import Subtitle from '@/components/ui/atoms/Subtitle/Subtitle'
import TitleProjectPage from '@/components/ui/atoms/TitleProjectPage/TitleProjectPage'
import styles from './mentions.module.scss'

export default function MentionsLegales() {
    return (
        <section className="mentions">
            <div className={styles.mentions__largeScreen}>
                <div className={styles.mentions__largeScreen__titleWrapper}>
                    <TitleProjectPage text="Mentions légales" />
                </div>
                <Subtitle text="Responsable de la publication" />
                <p className={styles.mentions__largeScreen__p}>
                    Photographe
                    <br />
                    M. Hugo Randez
                    <br />
                    Adresse: Fos-sur-mer
                    <br />
                    Numéro SIRET : xxxxxxxxx
                </p>
                <Subtitle text="Propriété intellectuelle" />

                <p className={styles.mentions__largeScreen__p}>
                    Les textes, illustrations et les photos de ce site sont la
                    propriété de Hugo Randez.
                </p>
                <Subtitle text="Hébergement" />
                <p className={styles.mentions__largeScreen__p}>
                    Nom de l&apos;hébergeur: Hostinger
                    <br />
                    adresse : Hostinger, UAB, Jonavos g. 60C, Kaunas, Lituanie,
                    44192 <br />
                    email : press@hostinger.com
                </p>
                <Subtitle text="Développement" />
                <p className={styles.mentions__largeScreen__p}>
                    Site créé par la société Antoine Developpeur
                    <br />
                    email: antoine.developpeur@gmail.com
                </p>
            </div>
        </section>
    )
}
