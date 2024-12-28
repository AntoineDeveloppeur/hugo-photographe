import styles from './projectPage.module.scss'
import Photo from '@/components/ui/atoms/Photo/Photo'
import TitleProjectPage from '@/components/ui/atoms/TitleProjectPage/TitleProjectPage'
import data from '@/data/data.json'
import PhotosSets from '@/components/ui/molecules/PhotosSets/PhotosSets'
export default function ProjectPage() {
    return (
        <section className={styles.projectPage}>
            <div className={styles.projectPage__largeScreen}>
                <div className={styles.projectPage__largeScreen__photoWrapper}>
                    <Photo photo={data.projects[0].mainPhoto} />
                </div>
                <div className={styles.projectPage__largeScreen__titleWrapper}>
                    <TitleProjectPage text="Titre tout a fait correct" />
                </div>
                {data.projects[0].textsAbovePhotos &&
                    data.projects[0].textsAbovePhotos.map((text, index) => (
                        <p
                            key={index}
                            className={
                                styles.projectPage__largeScreen__textAbovePhotos
                            }
                        >
                            {text}
                        </p>
                    ))}
                <PhotosSets photosSets={data.projects[0].photosSets} />
            </div>
        </section>
    )
}
