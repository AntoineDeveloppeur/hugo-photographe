import { PortfolioData } from "@/types"

type findPositionOfURLReturn = {
  column: string | null
  index: number | null
}

export const deletePhotoByUrl = (
  url: string,
  object: PortfolioData
): PortfolioData => {
  const { column, index } = findPhotoPosition(url, object)
  if (index === null || column === null) return object
  const updatedPortfolio = deletePhotoAtPosition(object, column, index)
  return updatedPortfolio
}

export const deletePhotoAtPosition = (
  object: PortfolioData,
  column: string,
  index: number
): PortfolioData => {
  const updatedPortfolio = structuredClone(object)
  console.log("je suis a deleteURL")

  updatedPortfolio[column] = updatedPortfolio[column].toSpliced(index, 1)
  return updatedPortfolio
}

export const findPhotoPosition = (
  url: string,
  items: PortfolioData
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
