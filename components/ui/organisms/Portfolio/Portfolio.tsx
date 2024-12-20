import styles from './portfolio.module.scss'
import Title from '@/components/ui/atoms/Title/Title'
import Subtitle from '../../atoms/Subtitle/Subtitle'
import data from '@/data/data.json'
import PhotosRows from '../../molecules/PhotoRows/PhotosRows'

export default function () {
    return (
        <div className={styles.portfolio}>
            <Title content="PORTFOLIO" />
            <div className={styles.subtitleWrapper}>
                <Subtitle content="UN APERCU DE MON TRAVAIL" />
            </div>
            <PhotosRows rows={data.galery} />
        </div>
    )
}
