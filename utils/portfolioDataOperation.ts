import { Items } from "@/types"

type findPositionOfURLReturn = {
  column: string | null
  index: number | null
}

export const deleteURL = (url: string, object: Items): Items => {
  const { column, index } = findPositionOfURL(url, object)
  if (index === null || !column) return object
  return deleteURLOfKnownPosition(object, column, index)
}

export const deleteURLOfKnownPosition = (
  object: Items,
  column: string,
  index: number
): Items => {
  const deepCopy = structuredClone(object)
  console.log("je suis a  deleteURL")

  deepCopy[column] = deepCopy[column].toSpliced(index, 1)
  return deepCopy
}

export const findPositionOfURL = (
  url: string,
  items: Record<string, string[]>
): findPositionOfURLReturn => {
  console.log("je suis a  findPositionOfURL")
  for (const column in items) {
    const index = items[column].findIndex((element) => element === url)
    console.log("index", index)
    if (index !== -1) {
      return { column: column, index: index }
    }
  }
  return { column: null, index: null }
}
