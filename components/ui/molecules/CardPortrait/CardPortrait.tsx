import styles from "./card-portrait.module.scss"
import TitleCard from "@/components/ui/atoms/TitleCard/TitleCard"
import Link from "next/link"
import { CardProps } from "@/types/index.js"
import PhotoBasic from "@/components/ui/atoms/PhotoBasic/PhotoBasic"
import DeleteOption from "@/components/ui/molecules/teOption/DeleteOption"

export default function CardPortrait({
  _id,
  title,
  summary,
  mainPhoto,
  deleteOption = false,
}: CardProps) {
  return (
    <div className={styles.cardWrapper}>
      {deleteOption && (
        <DeleteOption
          id={_id}
          title={title}
        />
      )}
      <Link
        className={styles.cardWrapper__card}
        href={`/projectPage/${_id}`}
      >
        <div className={styles.cardWrapper__gradientLayer}></div>
        <PhotoBasic
          photo={mainPhoto}
          sizes="(max-width: 684px) 100vw, (max-width: 1094px) 45vw, 30vw"
          className={styles.cardWrapper__card__imageWrapper}
          imageClassName={styles.cardWrapper__card__imageWrapper__image}
        />
        <div className={styles.cardWrapper__card__title}>
          <TitleCard text={title} />
        </div>
        <div className={styles.cardWrapper__card__line}></div>
        <div className={styles.cardWrapper__card__summary}>
          <p className={styles.cardWrapper__card__summary__text}>
            {summary}...&nbsp;
            <span className={styles.cardWrapper__card__summary__seeMore}>
              voir plus
            </span>
          </p>
        </div>
      </Link>
    </div>
  )
}
