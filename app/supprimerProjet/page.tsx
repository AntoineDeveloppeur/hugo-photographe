'use client'


import TitleProjectPage from '@/components/ui/atoms/TitleProjectPage/TitleProjectPage'
import styles from './supprimer-projet.module.scss'
import FormConnexion from '@/components/ui/organisms/FormConnexion/FormConnexion'
import CardPortrait from '@/components/ui/molecules/CardPortrait/CardPortrait'
import Button from '@/components/ui/atoms/Button/Button'
import { useState, useEffect } from 'react'
import Pagination from '@/components/ui/molecules/Pagination/Pagination'
import { motion, AnimatePresence } from 'framer-motion'
import { projectsProps } from '@/types'
import CardLandscape from '@/components/ui/molecules/CardLandscape/CardLandscape'
import useIsMobile from '@/hooks/useIsMobile'
import useGetProjects from '@/hooks/useGetProjects'

export default function Supprimer() {

        const data = useGetProjects()
        console.log('data',data)
    
        const isMobile = useIsMobile()
        // définir une constant qui dépend du nombre de projets
        // const projectsCount = nombre d'élément dans le tableau de données
        const projectsPerPage: number = 6
        const projectsCount: number = data.projects.length
        const PagesCount = Math.ceil(projectsCount / projectsPerPage)
    
        const [isExpandedView, setIsExpandedView] = useState<boolean>(false)
        const projectCountPerPage = isExpandedView ? 6 : 3
    
        
        
        //Enregistrer la page actuelle dans les données locales et supprimer lorsque la page est quittée
        const currentPageStored = window.localStorage.getItem("currentPage") !== null ? Number(window.localStorage.getItem("currentPage")) : 1
        const [currentPage, setCurrentPage] = useState<number>(currentPageStored)
        useEffect(() => {
            window.localStorage.setItem('currentPage', currentPage.toString())
        }, [currentPage])
        
        
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
        <section className={styles.supprimer}>
            <div className={styles.supprimer__largeScreen}>
                <div className={styles.supprimer__largeScreen__titleWrapper}>
                    <TitleProjectPage text="Supprimer un projet" />
                </div>
                <motion.div 
                    className={styles.supprimer__largeScreen__cards}
                >
                <AnimatePresence mode="wait">
                        {currentPage === 1 && (
                            <div key="cardLandscape" className={styles.supprimer__largeScreen__cards__cardLandscapteWrapper}>
                            { isMobile ?                            
                            <CardPortrait
                            title={data.projects[0].title}
                            summary={data.projects[0].summary}
                            mainPhoto={data.projects[0].mainPhoto}
                            id={data.projects[0]._id}
                            deleteIcon={true}
                            />
                            :
                            <CardLandscape
                            title={data.projects[0].title}
                            summary={data.projects[0].summary}
                            mainPhoto={data.projects[0].mainPhoto}
                            id={data.projects[0]._id}
                            deleteIcon={true}
                            />
                            }
                            </div>
                        )}
                        <div key="cardPortrait" className={styles.supprimer__largeScreen__cards__cardPortraitWrapper}>

                        {(data.projects as projectsProps[])
                        .slice(
                            currentPage === 1 ? 1 : (currentPage - 1) * projectsPerPage + 1,
                            currentPage === 1 ? projectCountPerPage + 1 : 
                            (currentPage - 1) * projectsPerPage +
                                projectCountPerPage                      
                        )
                        .map((project: projectsProps, index) => (
                            <motion.div
                                key={`project${index}`}
                                className={
                                    styles.supprimer__largeScreen__cards__cardPortraitWrapper__cardPortrait
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
                                    <CardPortrait
                                        title={project.title}
                                        summary={project.summary}
                                        mainPhoto={project.mainPhoto}
                                        id={project._id}
                                        deleteIcon={true}
                                    />
                            </motion.div>
                        ))}
                        </div>
                    </AnimatePresence>
                </motion.div>
                {isExpandedView ? (
                   <Pagination
                        previousPage={previousPage}
                        nextPage={nextPage}
                        currentPage={currentPage}
                        pagesCount= {PagesCount}
                    />
                ) : (
                    projectsCount > 4 && (
                        <div
                            onClick={clickOnAllProjects}
                            className={
                                styles.supprimer__largeScreen__moreProjectsWrapper
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
