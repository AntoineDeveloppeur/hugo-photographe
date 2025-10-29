// Déclaration pour ignorer les imports backend dans le type-check du frontend
declare module "@/backend/*" {
  const content: any
  export default content
}

// Déclaration pour les images WebP
declare module "*.webp" {
  const content: {
    src: string
    height: number
    width: number
    blurDataURL?: string
  }
  export default content
}

// Déclaration pour d'autres formats d'images si nécessaire
declare module "*.jpg" {
  const content: {
    src: string
    height: number
    width: number
    blurDataURL?: string
  }
  export default content
}

declare module "*.jpeg" {
  const content: {
    src: string
    height: number
    width: number
    blurDataURL?: string
  }
  export default content
}

declare module "*.png" {
  const content: {
    src: string
    height: number
    width: number
    blurDataURL?: string
  }
  export default content
}
