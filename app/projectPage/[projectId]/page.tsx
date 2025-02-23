import styles from './projectPage.module.scss'
import TitleProjectPage from '@/components/ui/atoms/TitleProjectPage/TitleProjectPage'
import data from '@/data/data.json'
import PhotosSets from '@/components/ui/molecules/PhotosSets/PhotosSets'
import Paragraphes from '@/components/ui/molecules/Paragraphes/Paragraphes'
import Button from '@/components/ui/atoms/ButtonBig/ButtonBig'
import LinkBottomOfProjectPage from '@/components/ui/molecules/LinkBottomOfProjectPage/LinkBottomOfProjectPage'
import PhotoProjectPage from '@/components/ui/atoms/PhotoProjectPage/PhotoProjectPage'

const ProjectPage = async ({ params }) => {
    // aller chercher dans data.json le projet correspondant à params. Le paramètres est l'id du projet
    const { projectId } = await params
    const project = data.projects.find((project) => project.id === projectId)

    if (project) {
        return (
            <section className={styles.projectPage}>
            <div className={styles.projectPage__largeScreen}>
                <div className={styles.projectPage__largeScreen__photoWrapper}>
                    <PhotoProjectPage photo={project.mainPhoto} hoverEffect={false} />
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
                <LinkBottomOfProjectPage/>
            </div>
        </section>
        )
    }
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
                            Le projet n&apos;a pas été trouvé.
                        </p>
                        <Button text="Retourner aux projets" link="/" />
                    </div>
                </div>
            </section>
        )
    }
}

export default ProjectPage
