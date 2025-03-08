'use client'

import { PhotoVariableProps } from '@/types'
import styles from './photoBasic.module.scss'
import NextImage from 'next/image'

const PhotoBasic = ({ photo, sizes }: {photo: PhotoVariableProps, sizes: string}) => {
    return (
        <div className={styles.imageWrapper}>
            <NextImage
                className={styles.imageWrapper__image}
                src={photo.src}
                alt={photo.alt}
                width={photo.width || 4000}
                height={photo.height|| 3000}
                quality={75}
                sizes={sizes}
            />
        </div>
    )
}

export default PhotoBasic
