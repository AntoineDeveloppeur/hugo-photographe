import React from "react"
import styles from "./pagination.module.scss"
import ButtonArrow from "@/components/ui/atoms/ButtonArrow/ButtonArrow"

interface PaginationTypes {
  previousPage: () => void
  nextPage: () => void
  currentPage: number
  pagesCount: number
}

export default function Pagination({
  previousPage,
  nextPage,
  currentPage,
  pagesCount,
}: PaginationTypes) {
  return (
    <div className={styles.pagination}>
      <div
        className={styles.pagination__previous}
        onClick={(e) => {
          e.preventDefault()
          previousPage()
        }}
      >
        <ButtonArrow direction="left" />
      </div>
      <p className={styles.pagination__p}>
        {currentPage} / {pagesCount}
      </p>
      <div
        className={styles.pagination__next}
        onClick={(e) => {
          e.preventDefault()
          nextPage()
        }}
      >
        <ButtonArrow direction="right" />
      </div>
    </div>
  )
}
