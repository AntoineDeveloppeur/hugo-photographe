"use client"

import styles from "./photo-modifier-portfolio.module.scss"
import { PhotoProps } from "@/types"
import PhotoBasic from "../PhotoBasic/PhotoBasic"
import DeleteOption from "../../molecules/teOption/DeleteOption"
import { useDraggable } from "@dnd-kit/core"

export default function PhotoModifierPorfolio({
  photo,
  deleteOption,
  setPortfolio,
}: PhotoProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: photo.id as string,
  })

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined

  return (
    <>
      <div
        className={styles.imageWrapper}
        style={style}
        ref={setNodeRef}
        {...(!deleteOption && listeners)} // Supprime les interactions entre le drag-n-drop et la suppression des photos
        {...attributes}
      >
        {deleteOption && (
          <DeleteOption
            id={photo.src}
            setPortfolio={setPortfolio}
          />
        )}
        <PhotoBasic photo={photo} />
      </div>
    </>
  )
}
