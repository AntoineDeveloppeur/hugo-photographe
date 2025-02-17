'use client'

import styles from './portfolio.module.scss'
import Title from '@/components/ui/atoms/Title/Title'
import Subtitle from '../../atoms/Subtitle/Subtitle'
import data from '@/data/data.json'
import PhotoGallery from '../../atoms/PhotoGallery/PhotoGallery'
import { useState, useEffect } from 'react'
import type { PhotoVariableProps, GaleryType, DataType } from '@/types'
import ThemeChanger from '../../molecules/ThemeChanger/ThemeChanger'
import useIsMobile from '@/hooks/useIsMobile'
import ButtonRipple from '../../atoms/ButtonRipple/ButtonRipple'

export default function Portfolio() {

    const isMobile = useIsMobile()
    const [galery, setGalery] = useState<GaleryType>('galeryDesktop')
    useEffect(() => {
    const checkDevice = () => {
            if (window.innerWidth < 768) {
                setGalery('galeryMobile')
                return
            } else if (window.innerWidth < 1024) {
                setGalery('galeryTablet')
                return
            } else {
                setGalery('galeryDesktop')
                return
            }
        }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
    }, [])

    const handleRippleClick = () => {
        console.log('Ripple button clicked!')
    }

    return (
        <section id="Porfolio" className={styles.portfolio}>
            <div className={styles.portfolio__largeScreen}>
                <div className={styles.portfolio__largeScreen__header}>
                    <div className={styles.portfolio__largeScreen__header__titles}>
                    <Title text="PORTFOLIO" />
                    <ButtonRipple text="Cliquez-moi !" onClick={handleRippleClick} />
                    <div className={styles.portfolio__largeScreen__header__titles__subtitleWrapper}>
                        <Subtitle text="UN APERCU DE MON TRAVAIL" />
                    </div>
                    </div>
                    {!isMobile && <ThemeChanger />}
                </div>
                <div className={styles.portfolio__largeScreen__columns}>
                    {(data as DataType)[galery].map((columns: PhotoVariableProps[], i) => (
                        <div
                            key={`column${i}`}
                            className={
                                styles.portfolio__largeScreen__columns__column
                            }
                        >
                            {columns.map((pic: PhotoVariableProps, i) => (
                                <PhotoGallery key={`pic${i}`} photo={pic} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
