"use client"

import styles from "./card-portrait.module.scss"
import TitleCard from "../../atoms/TitleCard/TitleCard"
import Link from "next/link"
import { CardProps } from "@/types/index.js"
import IconDelete from "../../atoms/IconDelete/IconDelete"
import { useState } from "react"
import ModalDeleteProject from "../ModalDeleteProject/ModalDeleteProject"
import PhotoBasic from "@/components/ui/atoms/PhotoBasic/PhotoBasic"
import { useRouter } from "next/navigation"

export default function CardPortrait({
  _id,
  title,
  summary,
  mainPhoto,
  deleteIcon,
}: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleDelete = () => {
    setIsModalOpen(true)
  }

  const Router = useRouter()

  return (
    <div className={styles.cardWrapper}>
      {deleteIcon && (
        <div
          className={styles.cardWrapper__deleteWrapper}
          onClick={handleDelete}
        >
          <IconDelete />
        </div>
      )}
      {isModalOpen && (
        <ModalDeleteProject
          _id={_id}
          title={title}
          isOpen={isModalOpen}
          // Solution pas élégante, à revoir
          onClose={() => (window.location.href = "/supprimerProjet")}
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
