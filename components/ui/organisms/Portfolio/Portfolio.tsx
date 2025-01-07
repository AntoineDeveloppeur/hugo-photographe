import styles from './portfolio.module.scss'
import Title from '@/components/ui/atoms/Title/Title'
import Subtitle from '../../atoms/Subtitle/Subtitle'
import data from '@/data/data.json'
import PhotoGallery from '../../atoms/PhotoGallery/PhotoGallery'

const Portfolio = () => {
    return (
        <section id="Porfolio" className={styles.portfolio}>
            <div className={styles.portfolio__largeScreen}>
                <Title text="PORTFOLIO" />
                <div className={styles.portfolio__largeScreen__subtitleWrapper}>
                    <Subtitle text="UN APERCU DE MON TRAVAIL" />
                </div>
                <div className={styles.portfolio__largeScreen__columns}>
                    {data.galery.map((columns, i): any => (
                        <div
                            key={`column${i}`}
                            className={
                                styles.portfolio__largeScreen__columns__column
                            }
                        >
                            {columns.map((pic, i): any => (
                                <PhotoGallery key={`pic${i}`} photo={pic} effect="effect1" />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Portfolio
