import Photo from '../../atoms/Photo/Photo'
import TitleCard from '../../atoms/TitleCard.tsx/TitleCard'
import voiture from '@/public/voiture.jpg'
import styles from './card.module.scss'
import Link from 'next/link'
import { CardProps } from '@/types/index.js'

const Card = ({ title, description, photo }: CardProps) => {
    return (
        <div className={styles.card}>
            <Photo photo={photo} />
            <TitleCard text={title} />
            <div className={styles.card__line}></div>
            <div className={styles.card__summary}>
                <p className={styles.card__summary__text}>{description}</p>
                <p className={styles.card__summary__dots}>... </p>
                <Link href="/" className={styles.card__summary__link}>
                    voir plus
                </Link>
            </div>
        </div>
    )
}

export default Card
