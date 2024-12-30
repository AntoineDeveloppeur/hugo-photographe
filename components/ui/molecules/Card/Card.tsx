import Photo from '../../atoms/Photo/Photo'
import TitleCard from '../../atoms/TitleCard.tsx/TitleCard'
import styles from './card.module.scss'
import Link from 'next/link'
import { CardProps } from '@/types/index.js'

const Card = ({ id, title, description, mainPhoto }: CardProps) => {
    const descriptionShort = description.split(' ').slice(0, 20).join(' ')

    return (
        <Link className={styles.card} href={`/projectPage/${id}`}>
            <Photo photo={mainPhoto} />
            <div className={styles.card__title}>
                <TitleCard text={title} />
            </div>
            <div className={styles.card__line}></div>
            <div className={styles.card__summary}>
                <p className={styles.card__summary__text}>{descriptionShort}</p>
                <p className={styles.card__summary__dots}>... </p>
                <p className={styles.card__summary__seeMore}>voir plus</p>
            </div>
        </Link>
    )
}

export default Card
