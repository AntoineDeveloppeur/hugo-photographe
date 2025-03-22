'use client'

import styles from './portfolio.module.scss'
import Title from '@/components/ui/atoms/Title/Title'
import Subtitle from '../../atoms/Subtitle/Subtitle'
import data from '@/data/data.json'
import PhotoGallery from '../../atoms/PhotoGallery/PhotoGallery'
import { useState, useEffect } from 'react'
import type { PhotosSetsProps, PhotoVariableProps, GaleryType, DataType } from '@/types'
import ButtonTheme from '../../atoms/ButtonTheme/ButtonTheme'
const Portfolio = () => {

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


    return (
        <section id="Porfolio" className={styles.portfolio}>
            <div className={styles.portfolio__largeScreen}>
                <Title text="PORTFOLIO" />
                <ButtonTheme />
                <div className={styles.portfolio__largeScreen__subtitleWrapper}>
                    <Subtitle text="UN APERCU DE MON TRAVAIL" />
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

export default Portfolio
