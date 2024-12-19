import styles from './photo.module.scss'
import Image from 'next/image'

export default function Photo({ photo }: { photo: Object }) {
    return <Image className={styles.image} src={photo.src} placeholder="blur" />
}
