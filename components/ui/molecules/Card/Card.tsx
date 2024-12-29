import Photo from '../../atoms/Photo/Photo'
import TitleCard from '../../atoms/TitleCard.tsx/TitleCard'
import styles from './card.module.scss'
import Link from 'next/link'
import { CardProps } from '@/types/index.js'

const Card = ({ id, title, description, mainPhoto }: CardProps) => {
    return (
        <div className={styles.card}>
            <Photo photo={mainPhoto} />
            <div className={styles.card__title}>
                <TitleCard text={title} />
            </div>
            <div className={styles.card__line}></div>
            <div className={styles.card__summary}>
                <p className={styles.card__summary__text}>{description}</p>
                <p className={styles.card__summary__dots}>... </p>
                <Link
                    href={`/projectPage/${id}`}
                    className={styles.card__summary__link}
                >
                    voir plus
                </Link>
            </div>
        </div>
    )
}

export default Card
