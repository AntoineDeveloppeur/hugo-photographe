import { PhotosSetsProps } from '@/types'
import styles from './photosSets.module.scss'
import PhotoBasic from '../../atoms/PhotoBasic/PhotoBasic'
import PhotoGallery from '../../atoms/PhotoGallery/PhotoGallery'
import PhotoProjectPage from '@/components/ui/atoms/PhotoProjectPage/PhotoProjectPage'

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
                            className={`${styles.photosSets__photosSet__photoWrapper} 
                            ${styles[`photosSets__photosSet__photoWrapperFor${photosSet.length}photo`]}
                            `}
                            key={`photo-${setIndex}-${photoIndex}`}
                        >
                            <PhotoProjectPage photo={photo} hoverEffect={false} priority={false} sizes={
                                photosSet.length === 1 ? '100vw' : 
                                photosSet.length === 2 ? '(max-width: 737px) 100vw, 50vw' :
                                '(max-width: 737px) 100vw, 30vw'
                            }/>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default PhotosSets
