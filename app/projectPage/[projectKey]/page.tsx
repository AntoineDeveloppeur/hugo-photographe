import styles from './projectPage.module.scss'
import Photo from '@/components/ui/atoms/Photo/Photo'
import TitleProjectPage from '@/components/ui/atoms/TitleProjectPage/TitleProjectPage'
import data from '@/data/data.json'
import PhotosSets from '@/components/ui/molecules/PhotosSets/PhotosSets'
import Paragraphes from '@/components/ui/molecules/Paragraphes/Paragraphes'
export default function ProjectPage({ params }) {
    // aller chercher dans data.json le projet correspondant à params. Le paramètres est la clé du projet
    const project = data.projects.find(
        (project) => project.key === params.projectKey
    )
    if (!project) {
        // Si le projet n'est pas trouvé, renvoyer une page d'erreur
        return <div>Erreur 404 : Projet introuvable</div>
    }

    return (
        <section className={styles.projectPage}>
            <div className={styles.projectPage__largeScreen}>
                <div className={styles.projectPage__largeScreen__photoWrapper}>
                    <Photo photo={project.mainPhoto} />
                </div>
                <div className={styles.projectPage__largeScreen__titleWrapper}>
                    <TitleProjectPage text={project.title} />
                </div>
                <div
                    className={
                        styles.projectPage__largeScreen__paragraphesWrapper
                    }
                >
                    {project.textsAbovePhotos && (
                        <Paragraphes texts={project.textsAbovePhotos} />
                    )}
                </div>
                <PhotosSets photosSets={project.photosSets} />
                <div
                    className={
                        styles.projectPage__largeScreen__paragraphesWrapper
                    }
                >
                    {project.textsBelowPhotos && (
                        <Paragraphes texts={project.textsBelowPhotos} />
                    )}
                </div>
            </div>
        </section>
    )
}
