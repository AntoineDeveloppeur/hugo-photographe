import styles from './projectPage.module.scss'
import dataFallBack from '@/data/data.json'
import TitleProjectPage from '@/components/ui/atoms/TitleProjectPage/TitleProjectPage'
import Paragraphes from '@/components/ui/molecules/Paragraphes/Paragraphes'
import PhotosSets from '@/components/ui/molecules/PhotosSets/PhotosSets'
import LinkBottomOfProjectPage from '@/components/ui/molecules/LinkBottomOfProjectPage/LinkBottomOfProjectPage'
import PhotoProjectPage from '@/components/ui/atoms/PhotoProjectPage/PhotoProjectPage'
import Button from '@/components/ui/atoms/ButtonBig/ButtonBig'
import { projectsProps, Data } from '@/types'
import getBlurDataURL from '@/utils/plaiceholder'


export async function generateStaticParams() {
    const data: Data = await getData()
    // il faudrait que je dise que les params possibles sont data.projects.id
    return data.projects.map((project) => ({
        projectId: project._id
    }))
    // Donc generateStaticParams attends un tableau de tous les params
}

async function getData(): Promise<Data> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/getProjects`
            // , {
                // next : { revalidate: 3600}
                // }   
            )
        if (!response.ok) {
            return dataFallBack
        }
        const data: Data = await response.json()
        return data
    } catch {
        return dataFallBack
    }
}


export default async function ProjectPage({
    params
}: {
    params: Promise<{ projectId: string }>
}) {
    //est-ce que c'est mal de récupérer l'id de l'objet mongoDB pour le passer en paramètre dynamique ?
    // Peut-être problème de sécurité ?

    // Nouvelle méthode avec generateStaticParams
    const { projectId } = await params
    const data: Data = await getData()
    const project: projectsProps | undefined = data.projects.find((project) => project._id === projectId)

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
    } else {
        return (
            <section className={styles.projectPage}>
                <article className={styles.projectPage__largeScreen}>
                    <div className={styles.projectPage__largeScreen__photoWrapper}>
                        <PhotoProjectPage photo={project.mainPhoto} hoverEffect={false} priority={true} sizes='100vw' mainPhoto={true}/>
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
                </article>
            </section>
        )
    }
}
