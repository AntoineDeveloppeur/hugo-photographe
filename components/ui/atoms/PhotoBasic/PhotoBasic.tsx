'use client'

import { PhotoVariableProps } from '@/types'
import styles from './photoBasic.module.scss'
import Image from '../Image/Image'

const PhotoBasic = ({
  photo,
  sizes,
}: {
  photo: PhotoVariableProps
  sizes: string
}) => {
  return (
    <Image
      photo={photo}
      sizes={sizes}
      className={styles.imageWrapper}
      imageClassName={styles.imageWrapper__image}
    />
  )
}

export default PhotoBasic
