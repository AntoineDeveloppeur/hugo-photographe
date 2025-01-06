'use client'

import { PhotoProps } from '@/types'
import styles from './photo.module.scss'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'
import ModalPhoto from '../ModalPhoto/ModalPhoto'

const Photo = ({ photo }: PhotoProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <motion.div 
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
            >
                <Image
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
                onClose={() => setIsModalOpen(false)}
            >
                <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={1920}
                    height={1080}
                    quality={100}
                    priority
                />
            </ModalPhoto>
        </>
    )
}

export default Photo
