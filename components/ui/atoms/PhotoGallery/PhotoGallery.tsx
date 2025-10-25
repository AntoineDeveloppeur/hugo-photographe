"use client"

import styles from "./photoGallery.module.scss"
import { PhotoProps } from "@/types"
import NextImage from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Loader from "../Loader/Loader"
import useIsMobile from "@/hooks/useIsMobile"
import PhotoBasic from "../PhotoBasic/PhotoBasic"
import dynamic from "next/dynamic"
import composeImageURL from "@/utils/composeImageURL"
import DeleteOption from "@/components/molecules/DeleteOption/DeleteOption"

// const Modal = lazy(() => import('../Modal/Modal'))
const Modal = dynamic(() => import("../Modal/Modal"))

export default function PhotoGallery({
  photo,
  hoverEffect,
  priority,
  deleteOption,
}: PhotoProps) {
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

  // Préchargement de la photo dans la modale
  useEffect(() => {
    // Lorsque le navigateur est disponible
    if ("requestIdleCallback" in window) {
      const requestIdleCallbackId = window.requestIdleCallback(() => {
        const image = new Image()
        image.src = composeImageURL(
          photo.width,
          80,
          photo.src,
          window.devicePixelRatio || 2
        )
      })

      if ("cancelIdleCallback" in window)
        return () => window.cancelIdleCallback(requestIdleCallbackId)
    }
    // Après un timer si le chargement du reste de la page est trop long ou
    // si requestIdleCallback n'est pas supporté
    else {
      const timeout = setTimeout(() => {
        const image = new Image()
        image.src = composeImageURL(
          photo.width,
          80,
          photo.src,
          window.devicePixelRatio || 2
        )
      }, 3000)
      return () => clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <motion.div
        data-testid="PhotoGalleryImageWrapper"
        className={styles.imageWrapper}
        onClick={() => !isMobile && setIsModalOpen(true)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={hoverEffect ? { scale: 1.08 } : undefined}
        whileTap={hoverEffect ? { scale: 1.08 } : undefined}
        transition={{
          duration: 3,
          ease: [0.215, 0.61, 0.355, 1],
        }}
        style={!isMobile ? { cursor: "pointer" } : undefined}
      >
        {deleteOption && <DeleteOption id={photo.src} />}

        <PhotoBasic
          photo={photo}
          priority={priority}
        />
      </motion.div>

      {!deleteOption && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
        >
          <div className={styles.modalImageContainer}>
            {isLoading && <Loader />}
            <NextImage
              className={`${styles.modalImage} ${
                !isLoading ? styles.loaded : ""
              }`}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              quality={80}
              priority={isHovered || isModalOpen}
              onLoad={() => setIsLoading(false)}
              style={{ objectFit: "contain" }}
            />
          </div>
        </Modal>
      )}
    </>
  )
}
