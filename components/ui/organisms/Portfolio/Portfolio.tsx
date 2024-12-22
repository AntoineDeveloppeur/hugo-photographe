import styles from './portfolio.module.scss'
import Title from '@/components/ui/atoms/Title/Title'
import Subtitle from '../../atoms/Subtitle/Subtitle'
import data from '@/data/data.json'
import Photo from '../../atoms/Photo/Photo'

// export default function () {
//     return (
//         <div className={styles.portfolio}>
//             <Title content="PORTFOLIO" />
//             <div className={styles.subtitleWrapper}>
//                 <Subtitle content="UN APERCU DE MON TRAVAIL" />
//             </div>
//             <PhotosRows rows={data.galery} />
//         </div>
//     )
// }

export default function Portfolio() {
    return (
        <div className={styles.portfolio}>
            <Title content="PORTFOLIO" />
            <div className={styles.portfolio__subtitleWrapper}>
                <Subtitle content="UN APERCU DE MON TRAVAIL" />
            </div>
            <div className={styles.portfolio__columns}>
                {data.galery.map((columns, i): any => (
                    <div
                        key={`column${i}`}
                        className={styles.portfolio__columns__column}
                    >
                        {columns.map((pic, i): any => (
                            <Photo key={`pic${i}`} photo={pic} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
