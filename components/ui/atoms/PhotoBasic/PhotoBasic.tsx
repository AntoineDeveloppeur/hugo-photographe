'use client'

import { PhotoVariableProps } from '@/types'
import styles from './photoBasic.module.scss'
import ServerImage from '../ServerImage/ServerImage'

const PhotoBasic = ({ photo, sizes }: {photo: PhotoVariableProps, sizes: string}) => {
    return (
        <ServerImage 
            photo={photo}
            sizes={sizes}
            className={styles.imageWrapper}
            imageClassName={styles.imageWrapper__image}
        />
    )
}

export default PhotoBasic
