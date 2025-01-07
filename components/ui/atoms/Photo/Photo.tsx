'use client'

import { PhotoProps } from '@/types'
import styles from './photo.module.scss'
import NextImage from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import ModalPhoto from '../ModalPhoto/ModalPhoto'
import Loader from '../Loader/Loader'

const Photo = ({ photo }: PhotoProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isHovered, setIsHovered] = useState(false)

    const handleModalClose = () => {
        setIsModalOpen(false)
        // Réinitialiser l'état de chargement pour la prochaine ouverture
        setIsLoading(true)
    }

    // Précharger l'image haute qualité au survol
    const preloadHighResImage = () => {
        const img = new window.Image()
        img.src = photo.src
        img.onload = () => {
            setIsLoading(false)
        }
        setIsHovered(true)
    }

    return (
        <>
            <motion.div 
                onClick={() => setIsModalOpen(true)}
                onMouseEnter={preloadHighResImage}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                <NextImage
                    className={styles.image}
                    src={photo.src}
                    alt={photo.alt}
                    width={500}
                    height={300}
                    quality={75}
                />
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
                        width={1920}
                        height={1080}
                        quality={100}
                        onLoadingComplete={() => setIsLoading(false)}
                    />
                </div>
            </ModalPhoto>
        </>
    )
}

export default Photo
