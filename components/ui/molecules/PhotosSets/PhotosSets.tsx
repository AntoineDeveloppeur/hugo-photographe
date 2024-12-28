import Photo from '@/components/ui/atoms/Photo/Photo'
import { PhotosSetsProps } from '@/types'
import styles from './photosSets.module.scss'

export default function PhotosSets({ photosSets }: PhotosSetsProps) {
    return (
        <>
            {photosSets.map((photosSet, setIndex) => (
                <div
                    className={`styles.photosSet styles.photosSet${photosSet.length}photo`}
                    key={`photosSet-${setIndex}`}
                >
                    {photosSet.map((photo, photoIndex) => (
                        <div
                            style={{
                                width: `calc(${90 / photosSet.length}%)`,
                            }}
                            // className={`styles.photosSet__photoWrapperFor${photosSet.length}photo`}
                            className={`styles.photosSet__photoWrapperFor${photosSet.length}photo`}
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
