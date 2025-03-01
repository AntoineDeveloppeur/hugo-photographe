'use client'

import { PhotoProps } from '@/types'
import styles from './photoBasic.module.scss'
import NextImage from 'next/image'

const PhotoBasic = ({ photo }: PhotoProps) => {
    return (
        <div className={styles.imageWrapper}>
            <NextImage
                className={styles.imageWrapper__image}
                src={photo.src}
                alt={photo.alt}
                width={photo.width || 4000}
                height={photo.height|| 3000}
                quality={75}
            />
        </div>
    )
}

export default PhotoBasic
