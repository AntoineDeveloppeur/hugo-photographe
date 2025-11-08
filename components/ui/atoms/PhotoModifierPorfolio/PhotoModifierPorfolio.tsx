"use client"

import styles from "./photo-modifier-portfolio.module.scss"
import { PhotoModifierPortfolioProps } from "@/types"
import PhotoBasic from "../PhotoBasic/PhotoBasic"
import DeleteOption from "../../molecules/DeleteOption/DeleteOption"

export default function PhotoModifierPorfolio({
  url,
  deleteOption,
  setItems,
}: PhotoModifierPortfolioProps) {
  return (
    <>
      <div className={styles.imageWrapper}>
        {deleteOption && (
          <DeleteOption
            id={url}
            setItems={setItems}
          />
        )}
        <PhotoBasic photo={{ src: url, alt: "jjj" }} />
      </div>
    </>
  )
}
