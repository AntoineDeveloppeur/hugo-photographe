import Photo from '../../atoms/Photo/Photo'
import TitleCard from '../../atoms/TitleCard.tsx/TitleCard'
import voiture from '@/public/voiture.jpg'
import styles from './card.module.scss'
import Link from 'next/link'

const Card = () => {
    const example = { src: voiture.src, alt: 'Voiture' }

    return (
        <div className={styles.card}>
            <Photo photo={example} />
            <TitleCard text="Première carte, qu'elle est jolie la première carte" />
            <div className={styles.cards__line}></div>
            <div className={styles.card__summary}>
                <p className={styles.card__summary__text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliim
                    veniam, quis nostrud exercitation ullamc
                </p>
                <p className={styles.card__summary__dots}>... </p>
                <Link href="/" className={styles.card__summary__link}>
                    voir plus
                </Link>
            </div>
        </div>
    )
}

export default Card
