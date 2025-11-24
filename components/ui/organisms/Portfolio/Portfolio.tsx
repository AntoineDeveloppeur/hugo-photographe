"use client"

import styles from "./portfolio.module.scss"
import Title from "@/components/ui/atoms/Title/Title"
import Subtitle from "@/components/ui/atoms/Subtitle/Subtitle"
import PhotoGallery from "@/components/ui/atoms/PhotoGallery/PhotoGallery"
import { useState, useEffect, useCallback } from "react"

import type { PhotoData } from "@/types"
import ThemeChanger from "@/components/ui/molecules/ThemeChanger/ThemeChanger"
import useIsMobile from "@/hooks/useIsMobile"
import useGetPortfolio from "@/hooks/useGetPortfolio"
import fallbackPortfolio from "@/data/fallbackPortfolio.json"
import adaptPortfolioToScreenSize from "@/utils/adaptPortfolioToScreenSize"

export default function Portfolio() {
  const isMobile = useIsMobile()

  const [portfolioLayout, setPortfolioLayout] = useState<PhotoData[][]>(() =>
    typeof window !== "undefined"
      ? adaptPortfolioToScreenSize(fallbackPortfolio, window)
      : []
  )

  const { portfolio } = useGetPortfolio()

  // Mise à jour du layout quand le portfolio change
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPortfolioLayout(adaptPortfolioToScreenSize(portfolio, window))
    }
  }, [portfolio])

  // Gestion du resize avec useCallback pour mémoriser la fonction
  const handleResize = useCallback(() => {
    if (typeof window !== "undefined") {
      setPortfolioLayout(adaptPortfolioToScreenSize(portfolio, window))
    }
  }, [portfolio])

  // Event listener pour le resize
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [handleResize])

  return (
    <section
      id="Porfolio"
      className={styles.portfolio}
    >
      <div className={styles.portfolio__largeScreen}>
        <div className={styles.portfolio__largeScreen__header}>
          <div className={styles.portfolio__largeScreen__header__titles}>
            <Title text="PORTFOLIO" />
            <div
              className={
                styles.portfolio__largeScreen__header__titles__subtitleWrapper
              }
            >
              <Subtitle text="UN APERCU DE MON TRAVAIL" />
            </div>
          </div>
          {!isMobile && <ThemeChanger />}
        </div>
        <div className={styles.portfolio__largeScreen__columns}>
          {portfolioLayout.map((columns: PhotoData[], i) => (
            <div
              key={`column${i}`}
              className={styles.portfolio__largeScreen__columns__column}
            >
              {columns.map((pic: PhotoData, i) => (
                <PhotoGallery
                  key={`pic${i}`}
                  photo={pic}
                  hoverEffect={true}
                  priority={pic.priority}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
