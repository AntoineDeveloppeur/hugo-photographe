"use client"

import styles from './card-landscape.module.scss'
import PhotoBasic from '../../atoms/PhotoBasic/PhotoBasic'
import TitleCard from '../../atoms/TitleCard/TitleCard'
import Link from 'next/link'
import { CardProps } from '@/types/index.js'
import { Player } from '@lordicon/react'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import Medal from '@/public/medal.json'
import { useState, useRef } from 'react'
import { useTheme } from 'next-themes'
import IconDelete from '../../atoms/IconDelete/IconDelete'


export default function CardLandscape({ _id, title, summary, mainPhoto, deleteIcon }: CardProps) {



    const playerRef = useRef<Player>(null)
    const medalWrapper = useRef<HTMLDivElement>(null)
    const [isAnimationStarted, setIsAnimationStarted] = useState<boolean>(false)
    
    // Utiliser useTheme pour forcer un rendu quand le thème change
    const { theme } = useTheme()
    
    // Utilise useScroll pour déclencher l'animation lorsque l'utilisateur se rapproche de la médaille
    const {scrollYProgress} = useScroll({
        target: medalWrapper,
        offset: ["start end", "end start"]
    });

    // Surveiller le changement de valeur avec useMotionValueEvent
    useMotionValueEvent(scrollYProgress, 'change', (latest) => {
        if (latest > 0.2 && !isAnimationStarted) {
            playerRef.current?.playFromBeginning()
            setIsAnimationStarted(true)
        }
        if (latest <= 0.2 && isAnimationStarted) {
            setIsAnimationStarted(false)
        }
    });

    return (
        <div className={styles.cardWrapper}>
            {deleteIcon && 
            <div className={styles.cardWrapper__deleteWrapper}>
                <IconDelete/>
            </div>
            }

            <Link className={styles.cardWrapper__card} href={`/projectPage/${_id}`}>
                <div ref={medalWrapper} className={styles.cardWrapper__card__medalWrapper}>
                    <Player 
                        ref={playerRef} 
                        icon={Medal} 
                        size={64} 
                        state='in-reveal' 
                        colors={theme === 'light' ? 'primary:#D96E75,secondary:#f0cace' : 'primary:#e5e5e5,secondary:#919191'}
                    />
                </div>
                <div className={styles.cardWrapper__card__gradientLayer}></div>
                <div className={styles.cardWrapper__card__photoWrapper}>
                    <PhotoBasic photo={mainPhoto} sizes="(max-width: 767px) 100vw, 45vw" />
                </div>
                <div className={styles.cardWrapper__card__text}>
                    <div className={styles.cardWrapper__card__text__title}>
                        <TitleCard text={title} />
                    </div>
                    <div className={styles.cardWrapper__card__text__line}></div>
                    <div className={styles.cardWrapper__card__text__summary}>
                        <p className={styles.cardWrapper__card__text__summary__text}>{summary}</p>
                        <p className={styles.cardWrapper__card__text__summary__dots}>... </p>
                        <p className={styles.cardWrapper__card__text__summary__seeMore}>voir plus</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}
