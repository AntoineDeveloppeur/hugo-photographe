import { PhotoVariableProps } from "@/types"

export default function adaptPortfolioToScreenSize(
  photos: PhotoVariableProps[],
  window: Window | undefined
): PhotoVariableProps[][] {
  if (typeof window === "undefined") {
    return groupPhotosInColumns(photos, 1)
  }
  if (window.matchMedia("(max-width: 767px)").matches) {
    return groupPhotosInColumns(photos, 1)
  } else if (window.matchMedia("(max-width: 1023px)").matches) {
    return groupPhotosInColumns(photos, 2)
  } else {
    return groupPhotosInColumns(photos, 3)
  }
}

function groupPhotosInColumns(
  photos: PhotoVariableProps[],
  columnCount: 1 | 2 | 3
): PhotoVariableProps[][] {
  const photosInColumns: PhotoVariableProps[][] | [][] = Array.from(
    { length: columnCount },
    () => []
  )
  console.log("[photos]", [photos])

  if (columnCount === 1) return [photos]
  if (columnCount === 2)
    photos.forEach((photo, index) => {
      photosInColumns[index % 2].push(photo)
    })
  if (columnCount === 3)
    for (const photo of photos) {
      photosInColumns[Number(photo.column) - 1].push(photo)
    }
  console.log("photosInColumns", photosInColumns)
  return photosInColumns
}
