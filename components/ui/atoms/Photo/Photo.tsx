import { PhotoProps } from '@/types'
import styles from './photo.module.scss'
import Image from 'next/image'

const Photo = ({ photo }: PhotoProps) => {
    // export default function Photo({ photo }: PhotoProps) {
    return (
        <Image
            className={styles.image}
            src={photo.src}
            alt={photo.alt}
            width={500}
            height={300}
            // placeholder="blur"
        />
    )
}

export default Photo
