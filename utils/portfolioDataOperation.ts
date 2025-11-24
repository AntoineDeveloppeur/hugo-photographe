import { Portfolio } from "@/types"

type findPositionOfURLReturn = {
  column: string | null
  index: number | null
}

export const deletePhotoByUrl = (url: string, object: Portfolio): Portfolio => {
  const { column, index } = findPhotoPosition(url, object)
  if (index === null || column === null) return object
  const updatedPortfolio = deletePhotoAtPosition(object, column, index)
  return updatedPortfolio
}

export const deletePhotoAtPosition = (
  object: Portfolio,
  column: string,
  index: number
): Portfolio => {
  const updatedPortfolio = structuredClone(object)
  console.log("je suis a deleteURL")

  updatedPortfolio[column] = updatedPortfolio[column].toSpliced(index, 1)
  return updatedPortfolio
}

export const findPhotoPosition = (
  url: string,
  items: Portfolio
): findPositionOfURLReturn => {
  console.log("je suis a  findPositionOfURL")
  for (const column in items) {
    const index = items[column].findIndex((element) => element.src === url)
    console.log("index", index)
    if (index !== -1) {
      return { column: column, index: index }
    }
  }
  return { column: null, index: null }
}
