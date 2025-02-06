import { PhotosSetsProps } from '@/types'
import styles from './photosSets.module.scss'
import PhotoBasic from '../../atoms/PhotoBasic/PhotoBasic'
import PhotoGallery from '../../atoms/PhotoGallery/PhotoGallery'

const PhotosSets = ({ photosSets }: PhotosSetsProps) => {
    return (
        <div className={styles.photosSets}>
            {photosSets.map((photosSet, setIndex) => (
                <div
                    className={`
                        ${styles.photosSets__photosSet} 
                        ${
                            styles[
                                `photosSets__photosSet${photosSet.length}photo`
                            ]
                        }`}
                    key={`photosSet-${setIndex}`}
                >
                    {photosSet.map((photo, photoIndex) => (
                        <div
                            // className={`styles.photosSet__photoWrapperFor${photosSet.length}photo`}
                            className={`${styles.photosSets__photosSet__photoWrapper} 
                            ${styles[`photosSets__photosSet__photoWrapperFor${photosSet.length}photo`]}
                            `}
                            key={`photo-${setIndex}-${photoIndex}`}
                        >
                            <PhotoBasic photo={photo} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default PhotosSets
