import styles from "./colonne-modifier-portfolio.module.scss"
import { PhotoVariableProps, ColumnType } from "@/types"
import { useDroppable } from "@dnd-kit/core"
import PhotoModifierPorfolio from "../../atoms/PhotoModifierPorfolio/PhotoModifierPorfolio"
import { Dispatch, SetStateAction } from "react"

type ColumnProps = {
  column: ColumnType
  photos: PhotoVariableProps[]
  deleteOption: boolean
  setPortfolio: Dispatch<SetStateAction<PhotoVariableProps[]>>
}
export function ColonneModifierPortfolio({
  column,
  photos,
  deleteOption,
  setPortfolio,
}: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.column,
  })

  return (
    <div
      ref={setNodeRef}
      className={styles.column}
    >
      {photos.map((pic: PhotoVariableProps, i) => (
        <PhotoModifierPorfolio
          key={`pic${i}`}
          photo={pic}
          deleteOption={deleteOption}
          setPortfolio={setPortfolio}
        />
      ))}
    </div>
  )
}
