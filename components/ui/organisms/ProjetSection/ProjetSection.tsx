'use client'

import Subtitle from '../../atoms/Subtitle/Subtitle'
import Title from '../../atoms/Title/Title'
import Card from '../../molecules/Card/Card'
import styles from './projet-section.module.scss'
import ButtonArrowRight from '@/components/ui/atoms/ButtonArrowRight/ButtonArrowRight'
import data from '@/data/data.json'
import { useState } from 'react'

export default function ProjetSection() {
    // définir une constant qui dépend du nombre de projets
    // const projectsCount = nombre d'élément dans le tableau de données
    const projectsPerPage: number = 6
    const projectsCount: number = data.projects.length
    const PagesCount = Math.ceil(projectsCount / projectsPerPage)

    const [isExpandedView, setIsExpandedView] = useState<boolean>(false)
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
                    {projectsCount > 3 && (
                        <div onClick={clickOnAllProjects}>
                            <ButtonArrowRight text="Tous les projets" />
                        </div>
                    )}
                </div>
                <div className={styles.projetSection__largeScreen__cards}>
                    {/* Afficher le nombre de projets entre 1 et 3 */}
                    {/* Ajouter un état qui prends en compte si l'utilisateur à cliquer sur 
                    'voir tous les projets', Si c'est le cas afficher le nombre de projet max 6 */}
                    {isExpandedView
                        ? data.projects
                              .slice(
                                  (currentPage - 1) * projectsPerPage,
                                  currentPage * projectsPerPage
                              )
                              .map((project, i): any => (
                                  <Card
                                      key={`project${i}`}
                                      id={project.key}
                                      title={project.title}
                                      description={project.description}
                                      mainPhoto={project.mainPhoto}
                                  />
                              ))
                        : data.projects
                              .slice(
                                  (currentPage - 1) * projectsPerPage,
                                  (currentPage - 1) * projectsPerPage + 3
                              )
                              .map((project, i): any => (
                                  <Card
                                      key={`project${i}`}
                                      id={project.key}
                                      title={project.title}
                                      description={project.description}
                                      mainPhoto={project.mainPhoto}
                                  />
                              ))}
                </div>
                {isExpandedView && (
                    <div
                        className={
                            styles.projetSection__largeScreen__pagination
                        }
                    >
                        <div
                            className={
                                styles.projetSection__largeScreen__pagination__previous
                            }
                            onClick={previousPage}
                        >
                            <ButtonArrowRight />
                        </div>
                        <p
                            className={
                                styles.projetSection__largeScreen__pagination__p
                            }
                        >
                            {currentPage}
                        </p>
                        <div
                            className={
                                styles.projetSection__largeScreen__pagination__next
                            }
                            onClick={nextPage}
                        >
                            <ButtonArrowRight />
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
