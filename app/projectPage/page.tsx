import styles from './projectPage.module.scss'
import Photo from '@/components/ui/atoms/Photo/Photo'
import TitleProjectPage from '@/components/ui/atoms/TitleProjectPage/TitleProjectPage'
import voiture from '@/public/voiture.jpg'
import data from '@/data/data.json'

export default function ProjectPage() {
    return (
        <section className={styles.projectPage}>
            <div className={styles.projectPage__largeScreen}>
                <div className={styles.projectPage__largeScreen__photoWrapper}>
                    <Photo photo={data.projects[0].mainPhoto} />

                    {/* <Photo photo={{ src: voiture.src, alt: 'voiture' }} /> */}
                </div>
                <TitleProjectPage text="Titre tout a fait correct" />
            </div>
        </section>
    )
}
