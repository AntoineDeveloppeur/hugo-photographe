'use client'

import { PhotoProps } from '@/types'
import styles from './photoBasic.module.scss'
import NextImage from 'next/image'

const PhotoBasic = ({ photo }: PhotoProps) => {
    return (
        <div className={styles.imageWrapper}>
            <NextImage
                className={styles.image}
                src={photo.src}
                alt={photo.alt}
                width={500}
                height={300}
                quality={75}
                style={{ objectFit: 'cover' }}
            />
        </div>
    )
}

export default PhotoBasic
