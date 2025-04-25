'use client'

import styles from './photoGallery.module.scss'
import { PhotoProps } from '@/types'
import NextImage from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import ModalPhoto from '../ModalPhoto/ModalPhoto'
import Loader from '../Loader/Loader'
import useIsMobile from '@/hooks/useIsMobile'
import ServerImage from '../ServerImage/ServerImage'

export default function PhotoGallery ({ photo, hoverEffect, priority }: PhotoProps) {
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
                {/* Utilisation du Server Component */}
                <ServerImage photo={photo} priority={priority} />
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