import styles from "./projectPage.module.scss"
import TitleProjectPage from "@/components/ui/atoms/TitleProjectPage/TitleProjectPage"
import Paragraphes from "@/components/ui/molecules/Paragraphes/Paragraphes"
import PhotosSets from "@/components/ui/molecules/PhotosSets/PhotosSets"
import LinkBottomOfProjectPage from "@/components/ui/molecules/LinkBottomOfProjectPage/LinkBottomOfProjectPage"
import PhotoProjectPage from "@/components/ui/atoms/PhotoProjectPage/PhotoProjectPage"
import { ProjectsProps, Data } from "@/types"
import getProjects from "@/utils/getProjects"
import { notFound } from "next/navigation"

// Permet de générer des pages pour les nouveaux projets non listés dans generateStaticParams
// export const dynamicParams = true

// Optionnel : Active l'ISR avec revalidation toutes les 5 secondes
export const revalidate = 2

// test sans force-dynamic qui force la revalidation à chaque requête
// export const dynamic = "force-dynamic"

export async function generateStaticParams() {
  const data: Data = await getProjects()
  // il faudrait que je dise que les params possibles sont data.projects.id
  return data.projects.map((project) => ({
    projectId: project._id,
  }))
  // Donc generateStaticParams attends un tableau de tous les params
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  // Nouvelle méthode avec generateStaticParams
  const { projectId } = await params
  const data: Data = await getProjects()

  const project: ProjectsProps | undefined = data.projects.find(
    (project) => project._id === projectId
  )
  console.log("je suis dans la page projectPage")
  if (!project) {
    // Si le projet n'est pas trouvé, renvoyer une page d'erreur
    return notFound()
  } else {
    return (
      <section className={styles.projectPage}>
        <article className={styles.projectPage__largeScreen}>
          <div className={styles.projectPage__largeScreen__photoWrapper}>
            <PhotoProjectPage
              photo={project.mainPhoto}
              hoverEffect={false}
              priority={true}
              sizes="100vw"
              mainPhoto={true}
            />
          </div>
          <div className={styles.projectPage__largeScreen__titleWrapper}>
            <TitleProjectPage text={project.title} />
          </div>
          <div className={styles.projectPage__largeScreen__paragraphesWrapper}>
            {project.textsAbovePhotos && (
              <Paragraphes texts={project.textsAbovePhotos} />
            )}
          </div>
          <PhotosSets photosSets={project.photosSets} />
          <div className={styles.projectPage__largeScreen__paragraphesWrapper}>
            {project.textsBelowPhotos && (
              <Paragraphes texts={project.textsBelowPhotos} />
            )}
          </div>
          <LinkBottomOfProjectPage />
        </article>
      </section>
    )
  }
}
