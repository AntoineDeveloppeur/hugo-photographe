"use client"

import styles from "./photo-modifier-portfolio.module.scss"
import { PhotoProps } from "@/types"
import PhotoBasic from "../PhotoBasic/PhotoBasic"
import DeleteOption from "../../molecules/DeleteOption/DeleteOption"

export default function PhotoModifierPorfolio({
  photo,
  deleteOption,
  setPortfolio,
}: PhotoProps) {
  return (
    <>
      <div className={styles.imageWrapper}>
        {deleteOption && (
          <DeleteOption
            id={photo}
            setPortfolio={setPortfolio}
          />
        )}
        <PhotoBasic photo={{ src: photo, alt: "jjj" }} />
      </div>
    </>
  )
}
