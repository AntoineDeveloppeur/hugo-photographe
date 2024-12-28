import styles from './projectPage.module.scss'
import Photo from '@/components/ui/atoms/Photo/Photo'
import TitleProjectPage from '@/components/ui/atoms/TitleProjectPage/TitleProjectPage'
import data from '@/data/data.json'
import PhotosSets from '@/components/ui/molecules/PhotosSets/PhotosSets'
import Paragraphes from '@/components/ui/molecules/Paragraphes/Paragraphes'
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
                <div
                    className={
                        styles.projectPage__largeScreen__paragraphesWrapper
                    }
                >
                    {data.projects[0].textsAbovePhotos && (
                        <Paragraphes
                            texts={data.projects[0].textsAbovePhotos}
                        />
                    )}
                </div>
                <PhotosSets photosSets={data.projects[0].photosSets} />
                <div
                    className={
                        styles.projectPage__largeScreen__paragraphesWrapper
                    }
                >
                    {data.projects[0].textsBelowPhotos && (
                        <Paragraphes
                            texts={data.projects[0].textsBelowPhotos}
                        />
                    )}
                </div>
            </div>
        </section>
    )
}
