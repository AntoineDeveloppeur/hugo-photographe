import Photo from '../../atoms/Photo/Photo'
import TitleCard from '../../atoms/TitleCard.tsx/TitleCard'
import voiture from '@/public/voiture.jpg'
import styles from './card.module.scss'

const Card = () => {
    const example = { src: voiture.src, alt: 'Voiture' }

    return (
        <div className={styles.cards}>
            <Photo photo={example} />
            <TitleCard text="Première carte, qu'elle est jolie la première carte" />
            <div className={styles.cards__line}></div>
        </div>
    )
}

export default Card
