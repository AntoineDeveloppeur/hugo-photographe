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
            <div className={styles.subtitleWrapper}>
                <Subtitle content="UN APERCU DE MON TRAVAIL" />
            </div>
            <div className={styles.columns}>
                {data.galery.map((columns): any => {
                    return (
                        <div className={styles.column}>
                            {columns.map((pic): any => {
                                return <Photo photo={pic} />
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
