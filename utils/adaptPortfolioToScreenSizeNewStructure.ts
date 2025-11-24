import { Portfolio, PhotoData } from "@/types"

export default function adaptPortfolioToScreenSizeNewStructure(
  portfolio: Portfolio,
  window: Window | undefined
): PhotoData[][] {
  if (typeof window === "undefined") {
    return flattenAllPhotos(portfolio)
  }
  if (window.matchMedia("(max-width: 767px)").matches) {
    return flattenAllPhotos(portfolio)
  } else if (window.matchMedia("(max-width: 1023px)").matches) {
    return groupPhotosInTwoColumns(portfolio)
  } else {
    return groupPhotosInThreeColumns(portfolio)
  }
}

function flattenAllPhotos(portfolio: Portfolio): PhotoData[][] {
  return [Object.values(portfolio).flat()]
}

function groupPhotosInTwoColumns(portfolio: Portfolio): PhotoData[][] {
  const flattendPhotos = flattenAllPhotos(portfolio)
  const photosInTwoColumns: PhotoData[][] = Array.from({ length: 2 }, () => [])

  flattendPhotos[0].forEach((photo, index) => {
    photosInTwoColumns[index % 2].push(photo)
  })
  return photosInTwoColumns
}

function groupPhotosInThreeColumns(portfolio: Portfolio): PhotoData[][] {
  return Object.values(portfolio)
}
