import styles from './card.module.scss'
import PhotoBasic from '../../atoms/PhotoBasic/PhotoBasic'
import TitleCard from '../../atoms/TitleCard/TitleCard'
import Link from 'next/link'
import { CardProps } from '@/types/index.js'


const Card = ({ id, title, description, mainPhoto }: CardProps) => {

    const descriptionShort = description.split(' ').slice(0, 20).join(' ')

    return (
        <div
        className={styles.cardWrapper}
        >

        <Link className={styles.cardWrapper__card} href={`/projectPage/${id}`}>
            <div className={styles.cardWrapper__gradientLayer}></div>
            <PhotoBasic photo={mainPhoto} />
        
            <div className={styles.cardWrapper__card__title}>
                <TitleCard text={title} />
            </div>
            <div className={styles.cardWrapper__card__line}></div>
            <div className={styles.cardWrapper__card__summary}>
                <p className={styles.cardWrapper__card__summary__text}>{descriptionShort}</p>
                <p className={styles.cardWrapper__card__summary__dots}>... </p>
                <p className={styles.cardWrapper__card__summary__seeMore}>voir plus</p>
            </div>
        </Link>
        </div>
    )
}

export default Card
