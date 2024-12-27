
import styles from './photoSets.module.scss'
import Photo from '../../atoms/Photo/Photo'
import { PhotosSetsProps } from '@/types'
export default function PhotosSets({photosSets} : PhotosSetsProps) {
    return (
        {photosSets.map((photosSet, index) => (
            <div
                className={styles.projectPage__largeScreen__photosSet}
                key={`photosSet${index}`}
            >
                {photosSet.map((photo, index) => (
                    <div
                        style={{
                            width: `calc(${90 / photosSet.length}%`,
                        }}
                        className={
                            styles.projectPage__largeScreen__photosSet__photoWrapper
                        }
                        key={`photoSet${index}`}
                    >
                        <Photo photo={photo} />
                    </div>
                ))}
            </div>
        ))}
    )
}