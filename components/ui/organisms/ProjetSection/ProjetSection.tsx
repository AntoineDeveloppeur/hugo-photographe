'use client'

import styles from './projet-section.module.scss'
import Subtitle from '../../atoms/Subtitle/Subtitle'
import Title from '../../atoms/Title/Title'
import Card from '../../molecules/Card/Card'
import ButtonArrowRight from '@/components/ui/atoms/ButtonArrowRight/ButtonArrowRight'
import Button from '../../atoms/Button/Button'
import data from '@/data/data.json'
import { useState } from 'react'
import Pagination from '../../molecules/Pagination/Pagination'

const ProjetSection = () => {
    // définir une constant qui dépend du nombre de projets
    // const projectsCount = nombre d'élément dans le tableau de données
    const projectsPerPage: number = 6
    const projectsCount: number = data.projects.length
    const PagesCount = Math.ceil(projectsCount / projectsPerPage)

    const [isExpandedView, setIsExpandedView] = useState<boolean>(false)
    const projectCountPerPage = isExpandedView ? 6 : 3

    const [currentPage, setCurrentPage] = useState<number>(1)

    function clickOnAllProjects() {
        setIsExpandedView(!isExpandedView)
    }
    function previousPage() {
        setCurrentPage(((currentPage - 2 + PagesCount) % PagesCount) + 1)
    }
    function nextPage() {
        setCurrentPage((currentPage % PagesCount) + 1)
    }

    return (
        <section id="Projects" className={styles.projetSection}>
            <div className={styles.projetSection__largeScreen}>
                <div className={styles.projetSection__largeScreen__top}>
                    <div
                        className={
                            styles.projetSection__largeScreen__top__TitleSubtitle
                        }
                    >
                        <Title text="PROJETS" />
                        <Subtitle text="VOYAGEZ A TRAVERS MES PROJETS" />
                    </div>
                </div>
                <div className={styles.projetSection__largeScreen__cards}>
                    {/* Afficher le nombre de projets entre 1 et 3 initialement
                    Si l'utilisateur à cliquer sur 'voir tous les projets' la 
                    variable isExpandedView devient true, Si c'est le cas afficher
                     le nombre de projet max 6 */}
                    {data.projects
                        .slice(
                            (currentPage - 1) * projectsPerPage,
                            (currentPage - 1) * projectsPerPage +
                                projectCountPerPage
                        )
                        .map((project, i): any => (
                            <div
                                key={`project${i}`}
                                className={
                                    styles.projetSection__largeScreen__cards__card
                                }
                            >
                                <Card
                                    id={project.id}
                                    title={project.title}
                                    description={project.description}
                                    mainPhoto={project.mainPhoto}
                                />
                            </div>
                        ))}
                </div>
                {isExpandedView ? (
                   <Pagination
                        previousPage={previousPage}
                        nextPage={nextPage}
                        currentPage={currentPage}
                    />
                ) : (
                    projectsCount > 3 && (
                        <div
                            onClick={clickOnAllProjects}
                            className={
                                styles.projetSection__largeScreen__moreProjectsWrapper
                            }
                        >
                            <Button text="Voir Plus de projets" />
                        </div>
                    )
                )}
            </div>
        </section>
    )
}
export default ProjetSection
