import styles from './projectPage.module.scss'
import Photo from '@/components/ui/atoms/Photo/Photo'
import TitleProjectPage from '@/components/ui/atoms/TitleProjectPage/TitleProjectPage'
import data from '@/data/data.json'
import PhotosSets from '@/components/ui/molecules/PhotosSets/PhotosSets'
import Paragraphes from '@/components/ui/molecules/Paragraphes/Paragraphes'
import Button from '@/components/ui/atoms/ButtonBig/ButtonBig'

const ProjectPage = ({ params }) => {
    // aller chercher dans data.json le projet correspondant à params. Le paramètres est la clé du projet
    const project = data.projects.find(
        (project) => project.id === params.projectId
    )
    if (!project) {
        // Si le projet n'est pas trouvé, renvoyer une page d'erreur
        return (
            <section className={styles.projectPage}>
                <div className={styles.projectPage__largeScreen}>
                    <div
                        className={styles.projectPage__largeScreen__404Wrapper}
                    >
                        <p
                            className={
                                styles.projectPage__largeScreen__404Wrapper__text
                            }
                        >
                            Le projet n'a pas été trouvé.
                        </p>
                        <Button text="Retourez aux projets" link="/" />
                    </div>
                </div>
            </section>
        )
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

export default ProjectPages
