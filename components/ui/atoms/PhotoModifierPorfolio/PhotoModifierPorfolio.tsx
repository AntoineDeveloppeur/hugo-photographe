"use client"

import styles from "./photo-modifier-portfolio.module.scss"
import { PhotoModifierPortfolioProps } from "@/types"
import PhotoBasic from "../PhotoBasic/PhotoBasic"
import DeleteOptionNewStructure from "../../molecules/DeleteOption/DeleteOptionNewStructure"

export default function PhotoModifierPorfolio({
  url,
  deleteOption,
  items,
  setPortfolio,
}: PhotoModifierPortfolioProps) {
  return (
    <>
      <div className={styles.imageWrapper}>
        {deleteOption && (
          <DeleteOptionNewStructure
            id={url}
            items={items}
            setPortfolio={setPortfolio}
          />
        )}
        <PhotoBasic photo={{ src: url, alt: "jjj" }} />
      </div>
    </>
  )
}
