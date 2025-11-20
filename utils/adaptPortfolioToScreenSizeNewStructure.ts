import { ItemsProps, PhotoVariableProps } from "@/types"

export default function adaptPortfolioToScreenSizeNewStructure(
  portfolio: ItemsProps,
  window: Window | undefined
): PhotoVariableProps[][] {
  if (typeof window === "undefined") {
    return groupPhotosInOneColumn(portfolio)
  }
  if (window.matchMedia("(max-width: 767px)").matches) {
    return groupPhotosInOneColumn(portfolio)
  } else if (window.matchMedia("(max-width: 1023px)").matches) {
    return groupPhotosInTwoColumns(portfolio)
  } else {
    return groupPhotosInThreeColumns(portfolio)
  }
}

function groupPhotosInOneColumn(portfolio: ItemsProps): PhotoVariableProps[][] {
  return [Object.values(portfolio).flat()]
}

function groupPhotosInTwoColumns(
  portfolio: ItemsProps
): PhotoVariableProps[][] {
  const photosInOneColumn = groupPhotosInOneColumn(portfolio)
  const photosInTwoColumns: PhotoVariableProps[][] = Array.from(
    { length: 2 },
    () => []
  )

  photosInOneColumn[0].forEach((photo, index) => {
    photosInTwoColumns[index % 2].push(photo)
  })
  return photosInTwoColumns
}

function groupPhotosInThreeColumns(
  portfolio: ItemsProps
): PhotoVariableProps[][] {
  return Object.values(portfolio)
}
