import Photo from '@/components/ui/atoms/Photo/Photo'
import { PhotosSetsProps } from '@/types'
import styles from './photosSets.module.scss'

export default function PhotosSets({ photosSets }: PhotosSetsProps) {
    return (
        <>
            {photosSets.map((photosSet, setIndex) => (
                <div
                    className={styles.projectPage__largeScreen__photosSet}
                    key={`photosSet-${setIndex}`}
                >
                    {photosSet.map((photo, photoIndex) => (
                        <div
                            style={{
                                width: `calc(${90 / photosSet.length}%)`,
                            }}
                            className={
                                styles.projectPage__largeScreen__photosSet__photoWrapper
                            }
                            key={`photo-${setIndex}-${photoIndex}`}
                        >
                            <Photo photo={photo} />
                        </div>
                    ))}
                </div>
            ))}
        </>
    )
}

// import styles from './photosSets.module.scss'
// import Photo from '../../atoms/Photo/Photo'
// import { PhotosSetsProps } from '@/types'
// export default function PhotosSets({ photosSets }: PhotosSetsProps) {
//     return (
//         <>
//             {photosSets.map((photosSet, setIndex) => (
//                 <div
//                     className={styles.projectPage__largeScreen__photosSet}
//                     key={`photosSet${setIndex}`}
//                 >
//                     {photosSet.map((photo, photoIndex) => (
//                         <div
//                             style={{
//                                 width: `calc(${90 / photosSet.length}%`,
//                             }}
//                             className={
//                                 styles.projectPage__largeScreen__photosSet__photoWrapper
//                             }
//                             key={`photoSet${photoIndex}`}
//                         >
//                             <Photo photo={photo} />
//                         </div>
//                     ))}
//                 </div>
//             ))}
//         </>
//     )
// }
