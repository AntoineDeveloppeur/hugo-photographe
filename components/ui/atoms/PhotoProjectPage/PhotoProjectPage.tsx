'use client'

import styles from './photo-project-page.module.scss'
import { PhotoProps } from '@/types'
import NextImage from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import ModalPhoto from '../ModalPhoto/ModalPhoto'
import Loader from '../Loader/Loader'
import useIsMobile from '@/hooks/useIsMobile'

const PhotoProjectPage = ({ photo, hoverEffect, priority, sizes, mainPhoto, blurDataURL }: PhotoProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isHovered, setIsHovered] = useState(false)
    const isMobile = useIsMobile()

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleMouseEnter = () => {
        setIsLoading(true)
        setIsHovered(true)

    }

    return (
        <>
            <motion.div 
                onClick={() => !isMobile && setIsModalOpen(true)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={hoverEffect ? { scale: 1.08 } : undefined}
                whileTap={hoverEffect ? { scale: 1.08 } : undefined}
                transition={{ 
                    duration: 5, 
                    ease: [0.215, 0.61, 0.355, 1]
                }}
                style={!isMobile ? {'cursor': 'pointer'} : undefined}
            >
                <div className={styles.imageWrapper}>
                    <NextImage
                        className={styles.imageWrapper__image}
                        src={photo.src}
                        alt={photo.alt}
                        width={photo.width}
                        height={photo.height}
                        quality={75}
                        priority={priority}
                        sizes={sizes}
                        //Permet de donner une dimensions prédéfinis pour éviter le layout shifting sur la photo principale affichée above the fold
                        // Ici il y a deux configurations disctinctes pour les photos portrait et paysage
                        // Les autres photos ont le temps de chargé est donc de prendre la place qu'ils leurs faut
                        style={mainPhoto ? (photo.height > photo.width ? {'height': '65vh', 'width': 'auto'} : {'height': 'auto', 'width': '100vw'}) : undefined}
                    />
                </div>
            </motion.div>

            <ModalPhoto
                isOpen={isModalOpen}
                onClose={handleModalClose}
            >
                <div className={styles.modalImageContainer}>
                    {isLoading && <Loader />}
                    <NextImage
                        className={`${styles.modalImage} ${!isLoading ? styles.loaded : ''}`}
                        src={photo.src}
                        alt={photo.alt}
                        width={photo.width}
                        height={photo.height}
                        quality={100}
                        priority={isHovered || isModalOpen}
                        onLoadingComplete={() => setIsLoading(false)}
                        style={{ objectFit: 'contain' }}
                    />
                </div>
            </ModalPhoto>
        </>
    )
}

export default PhotoProjectPage
