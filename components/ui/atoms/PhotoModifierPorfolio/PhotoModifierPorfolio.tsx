"use client"

import styles from "./photo-modifier-portfolio.module.scss"
import { PhotoModifierPortfolioProps } from "@/types"
import PhotoBasic from "../PhotoBasic/PhotoBasic"
import DeleteOptionNewStructure from "../../molecules/DeleteOption/DeleteOptionNewStructure"

export default function PhotoModifierPorfolio({
  url,
  deleteOption,
  items,
  setItems,
}: PhotoModifierPortfolioProps) {
  return (
    <>
      <div className={styles.imageWrapper}>
        {deleteOption && (
          <DeleteOptionNewStructure
            id={url}
            items={items}
            setItems={setItems}
          />
        )}
        <PhotoBasic photo={{ src: url, alt: "jjj" }} />
      </div>
    </>
  )
}
