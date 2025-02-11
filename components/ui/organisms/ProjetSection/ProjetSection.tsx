'use client'

import styles from './projet-section.module.scss'
import Subtitle from '../../atoms/Subtitle/Subtitle'
import Title from '../../atoms/Title/Title'
import Card from '../../molecules/Card/Card'
import Button from '../../atoms/Button/Button'
import data from '@/data/data.json'
import { useState } from 'react'
import Pagination from '../../molecules/Pagination/Pagination'
import { motion, AnimatePresence } from 'framer-motion'
import { projectsProps } from '@/types'

export default function ProjetSection() {
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
        document.getElementById('Projects')?.scrollIntoView({ behavior: 'smooth' })
    }
    function nextPage() {
        setCurrentPage((currentPage % PagesCount) + 1)
        document.getElementById('Projects')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section id="Projects" className={styles.projetSection}>
            <div className={styles.projetSection__largeScreen}>
                <div className={styles.projetSection__largeScreen__titleAndSubtitle}>
                        <Title text="PROJETS" />
                        <Subtitle text="VOYAGEZ A TRAVERS MES PROJETS" />
                </div>
                <motion.div 
                    className={styles.projetSection__largeScreen__cards}
                    layout
                >
                    <AnimatePresence mode="wait">
                        {(data.projects as projectsProps[])
                        .slice(
                            (currentPage - 1) * projectsPerPage,
                            (currentPage - 1) * projectsPerPage +
                                projectCountPerPage )
                        .map((project: projectsProps, index) => (
                            <motion.div
                                key={project.id}
                                className={
                                    styles.projetSection__largeScreen__cards__card
                                }
                                initial={{ opacity: 0 }}
                                animate={{ 
                                    opacity: 1,
                                    transition: {
                                        duration: 0.5,
                                        delay: index * 0.2,
                                        ease: "easeOut"
                                    }
                                }}
                                exit={{ 
                                    opacity: 0,
                                    transition: {
                                        duration: 0.3,
                                        ease: "easeIn"
                                    }
                                }}
                            >
                                    <Card
                                        title={project.title}
                                        summary={project.summary}
                                        mainPhoto={project.mainPhoto}
                                        id={project.id}
                                    />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
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
