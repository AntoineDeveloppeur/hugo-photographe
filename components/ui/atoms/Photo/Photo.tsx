import { PhotoProps } from '@/types'
import styles from './photo.module.scss'
import Image from 'next/image'

export default function Photo({ photo }: PhotoProps) {
    return (
        <Image
            className={styles.image}
            src={photo.src}
            alt={photo.alt}
            // placeholder="blur"
        />
    )
}
