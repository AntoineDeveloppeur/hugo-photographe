export default function composeImageURL(
  width: number,
  quality: number,
  src: string,
  densityPixelRatio: number
) {
  // Next ne permet pas d'avoir toutes les tailles d'images
  // Permet d'obtenir la bonne width en fonction de la width initiale

  const srcCorrected = src.slice(1)
  const URL = `${
    process.env.NEXT_PUBLIC_BASE_URL
  }/_next/image?url=%2F${srcCorrected}&w=${pickAcceptedByNextWidth(
    width,
    densityPixelRatio
  )}&q=${quality}`
  return URL
}

export const pickAcceptedByNextWidth = (
  width: number,
  densityPixelRatio: number
) => {
  //Valeurs prise dans le next.config.ts
  const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
  const imageSizes = [16, 32, 48, 64, 96, 128, 160, 256, 384]
  const widthPanel = [0, ...imageSizes, ...deviceSizes] // le 0 a été ajouté pour que la boucle for fonctionne
  //Je prends la liste en partant de la fin
  // Pour que chaque élément je le soustrait à width
  //Si le résultat est > 0 je continu
  //Lorsque le résultat est < 0 la width à prendre est celle de l'index précédent

  for (let i = widthPanel.length - 2; i > -2; i--) {
    if (widthPanel[i] - width * densityPixelRatio <= 0) return widthPanel[i + 1]
  }
}
