'use client'

import styles from './card-portrait.module.scss'
import PhotoBasic from '../../atoms/PhotoBasic/PhotoBasic'
import TitleCard from '../../atoms/TitleCard/TitleCard'
import Link from 'next/link'
import { CardProps } from '@/types/index.js'
import { useEffect, useRef} from 'react'
import { Player } from '@lordicon/react'
import ICON from '@/public/medal.json'

export default function CardPortrait ({ id, title, summary, mainPhoto }: CardProps) {
    const playerRef = useRef<Player>(null)

    useEffect(() => {
        playerRef.current?.playFromBeginning();
    }, [])

    return (
        <div
        className={styles.cardWrapper}
        >

        <Link className={styles.cardWrapper__card} href={`/projectPage/${id}`}>
            <div className={styles.cardWrapper__gradientLayer}></div>
                <PhotoBasic photo={mainPhoto} />
        
            <div className={styles.cardWrapper__card__title}>
                <TitleCard text={title} />
                <Player ref={playerRef} icon={ICON} />
            </div>
            <div className={styles.cardWrapper__card__line}></div>
            <div className={styles.cardWrapper__card__summary}>
                <p className={styles.cardWrapper__card__summary__text}>{summary}...&nbsp;
                <span className={styles.cardWrapper__card__summary__seeMore}>voir plus</span>
                </p>
            </div>
        </Link>
        </div>
    )
}
