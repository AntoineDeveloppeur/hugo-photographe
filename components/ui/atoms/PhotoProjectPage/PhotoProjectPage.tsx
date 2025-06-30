'use client'

import styles from './photo-project-page.module.scss'
import { PhotoProps } from '@/types'
import NextImage from 'next/image'
import { motion } from 'framer-motion'
import { useState, Suspense } from 'react'
import Modal from '../Modal/Modal'
import Loader from '../Loader/Loader'
import useIsMobile from '@/hooks/useIsMobile'
import PhotoBasic from '../PhotoBasic/PhotoBasic'

const PhotoProjectPage = ({
  photo,
  hoverEffect,
  priority,
  sizes,
  mainPhoto,
}: PhotoProps) => {
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
          ease: [0.215, 0.61, 0.355, 1],
        }}
        style={!isMobile ? { cursor: 'pointer' } : undefined}
      >
        <PhotoBasic
          photo={photo}
          priority={priority}
          sizes={sizes}
          mainPhoto={mainPhoto}
          className={styles.imageWrapper}
          imageClassName={styles.imageWrapper__image}
        />
      </motion.div>

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <div className={styles.modalImageContainer}>
          {isLoading && <Loader />}
          <NextImage
            className={`${styles.modalImage} ${
              !isLoading ? styles.loaded : ''
            }`}
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
      </Modal>
    </>
  )
}

export default PhotoProjectPage
