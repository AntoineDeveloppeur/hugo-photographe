import NextImage from 'next/image'
import { PhotoProps } from '@/types'
import styles from './serverImage.module.scss'

type ServerImageProps = {
  photo: PhotoProps['photo'];
  priority?: boolean;
  sizes?: string;
  mainPhoto?: boolean;
  className?: string;
  imageClassName?: string;
  style?: React.CSSProperties;
  quality?: number;
}

export default function ServerImage({ 
  photo, 
  priority = false, 
  sizes = "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw", 
  mainPhoto = false,
  className,
  imageClassName,
  style,
  quality = 75
}: ServerImageProps) {
  // Calcul du style conditionnel pour les photos principales (mainPhoto)
  const mainPhotoStyle = mainPhoto 
    ? (photo.height > photo.width 
        ? {'height': '65vh', 'width': 'auto'} 
        : {'height': 'auto', 'width': '100vw'}) 
    : undefined;

  // Combinaison des styles personnalisés et des styles mainPhoto
  const combinedStyle = mainPhoto ? {...mainPhotoStyle, ...style} : style;

  return (
    <div className={`${styles.imageWrapper} ${className || ''}`}>
      <NextImage
        className={`${styles.imageWrapper__image} ${imageClassName || ''}`}
        // className={`${styles.image} ${imageClassName || ''}`}
        src={photo.src}
        alt={photo.alt}
        width={photo.width || 4000}
        height={photo.height || 3000}
        quality={quality}
        sizes={sizes}
        priority={priority}
        style={combinedStyle}
      />
    </div>
  )
}
