const calculateResizeDimensions = (width: number, height: number) => {
  const maxWidth = 3840
  const maxHeight = 2160
  if (width <= maxWidth && height <= maxHeight) {
    return { width, height }
  }

  const widthRatio = maxWidth / width
  const heightRatio = maxHeight / height
  const ratio = Math.min(widthRatio, heightRatio)

  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio),
  }
}

export default calculateResizeDimensions
