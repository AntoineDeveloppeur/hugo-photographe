import styles from './card-landscape.module.scss'
import PhotoBasic from '../../atoms/PhotoBasic/PhotoBasic'
import TitleCard from '../../atoms/TitleCard/TitleCard'
import Link from 'next/link'
import { CardProps } from '@/types/index.js'


const CardLandscape = ({ id, title, summary, mainPhoto }: CardProps) => {

    const summaryShort = summary.split(' ').slice(0, 20).join(' ')

    return (
        <div
        className={styles.cardWrapper}
        >

        <Link className={styles.cardWrapper__card} href={`/projectPage/${id}`}>
            <div className={styles.cardWrapper__card__gradientLayer}></div>
            <div className={styles.cardWrapper__card__photoWrapper}>

            <PhotoBasic photo={mainPhoto} />
            </div>
            <div className={styles.cardWrapper__card__text}>
                <div className={styles.cardWrapper__card__text__title}>
                    <TitleCard text={title} />
                </div>
                <div className={styles.cardWrapper__card__text__line}></div>
                <div className={styles.cardWrapper__card__text__summary}>
                    <p className={styles.cardWrapper__card__text__summary__text}>{summaryShort}</p>
                    <p className={styles.cardWrapper__card__text__summary__dots}>... </p>
                    <p className={styles.cardWrapper__card__text__summary__seeMore}>voir plus</p>
                </div>
            </div>
        </Link>
        </div>
    )
}

export default CardLandscape
