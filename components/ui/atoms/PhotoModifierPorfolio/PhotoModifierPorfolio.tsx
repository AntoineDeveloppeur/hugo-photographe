"use client"

import styles from "./photo-modifier-portfolio.module.scss"
import { PhotoModifierPortfolioProps } from "@/types"
import PhotoBasic from "../PhotoBasic/PhotoBasic"
import DeleteOption from "../../molecules/DeleteOption/DeleteOption"

export default function PhotoModifierPorfolio({
  url,
  deleteOption,
  setPortfolio,
}: PhotoModifierPortfolioProps) {
  return (
    <>
      <div className={styles.imageWrapper}>
        {deleteOption && (
          <DeleteOption
            id={url}
            setPortfolio={setPortfolio}
          />
        )}
        {/* alt n'est pas précisé car la page n'est crawlable*/}
        {/* Les tailles n'ont pas d'importances dans cette page car le layout shifting importe seulement sur les pages crawlable */}
        <PhotoBasic photo={{ src: url, alt: "jjj", width: 300, height: 200 }} />
      </div>
    </>
  )
}
