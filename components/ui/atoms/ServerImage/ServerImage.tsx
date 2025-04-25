import NextImage from 'next/image'
import { PhotoProps } from '@/types'
import styles from './serverImage.module.scss'

export default function ServerImage({ photo, priority }: Omit<PhotoProps, 'hoverEffect'>) {
  return (
    <div className={styles.imageWrapper}>
      <NextImage
        className={styles.imageWrapper__image}
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        quality={75}
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
        priority={priority ? priority : false}
      />
    </div>
  )
}
