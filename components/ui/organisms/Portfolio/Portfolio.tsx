import styles from './portfolio.module.scss'
import Title from '@/components/ui/atoms/Title/Title'
import Subtitle from '../../atoms/Subtitle/Subtitle'
import data from '@/data/data.json'
import Photo from '../../atoms/Photo/Photo'

export default function Portfolio() {
    return (
        <section className={styles.portfolio}>
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
                                <Photo key={`pic${i}`} photo={pic} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
