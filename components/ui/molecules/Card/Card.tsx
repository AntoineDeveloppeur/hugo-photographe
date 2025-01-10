import styles from './card.module.scss'
import PhotoBasic from '../../atoms/PhotoBasic/PhotoBasic'
import TitleCard from '../../atoms/TitleCard/TitleCard'
import Link from 'next/link'
import { CardProps } from '@/types/index.js'
import { motion } from 'framer-motion'
import { useState } from 'react'

const Card = ({ id, title, description, mainPhoto }: CardProps) => {
    const descriptionShort = description.split(' ').slice(0, 20).join(' ')
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div className={isHovered ? styles.cardWrapper__hovered : styles.cardWrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>

        <Link className={styles.card} href={`/projectPage/${id}`}>
            <PhotoBasic photo={mainPhoto} />
        
            <div className={styles.card__title}>
                <TitleCard text={title} />
            </div>
            <div className={styles.card__line}></div>
            <div className={styles.card__summary}>
                <p className={styles.card__summary__text}>{descriptionShort}</p>
                <p className={styles.card__summary__dots}>... </p>
                <p className={styles.card__summary__seeMore}>voir plus</p>
            </div>
            <div className={ isHovered ? styles.hindHover__visible : styles.hindHover}>
            </div>
        </Link>
        </motion.div>
    )
}

export default Card
