export const deleteURL = (
  object: Photos,
  column: string,
  index: number
): Photos => {
  const deepCopy = structuredClone(object)
  console.log("je suis a  deleteURL")

  deepCopy[column] = deepCopy[column].toSpliced(index, 1)
  return deepCopy
}

type Photos = Record<string, string[]>

type findPositionOfURLReturn = {
  column: string | null
  index: number | null
}

export const findPositionOfURL = (
  url: string,
  photos: Record<string, string[]>
): findPositionOfURLReturn => {
  console.log("je suis a  findPositionOfURL")
  for (const column in photos) {
    const index = photos[column].findIndex((element) => element === url)
    console.log("index", index)
    if (index !== -1) {
      return { column: column, index: index }
    }
  }
  return { column: null, index: null }
}
