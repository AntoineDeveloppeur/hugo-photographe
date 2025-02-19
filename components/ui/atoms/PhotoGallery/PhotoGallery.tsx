'use client'

import styles from './photoGallery.module.scss'
import { PhotoProps } from '@/types'
import NextImage from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import ModalPhoto from '../ModalPhoto/ModalPhoto'
import Loader from '../Loader/Loader'

interface PhotoProps {
    photo: Photo
    hoverEffect: boolean
}

const PhotoGallery = ({ photo, hoverEffect }: PhotoProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isHovered, setIsHovered] = useState(false)
    console.log('hoverEffect dans photogallery',hoverEffect)

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
                onClick={() => setIsModalOpen(true)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={hoverEffect ? { scale: 1.08 } : undefined}
                transition={{ 
                    duration: 5, 
                    ease: [0.215, 0.61, 0.355, 1]
                }}
            >
                <div className={styles.imageWrapper}>
                    <NextImage
                        className={styles.imageWrapper__image}
                        src={photo.src}
                        alt={photo.alt}
                        width={500}
                        height={300}
                        quality={75}
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
                        width={1920}
                        height={1080}
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

export default PhotoGallery
