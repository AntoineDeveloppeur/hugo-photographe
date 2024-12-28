// types.ts

// Définition du type Photo
export interface PhotoProps {
    photo: { src: string; alt: string }
}

// Définition du type PhotoSet comme un tableau de Photo

export interface PhotoProps2 {
    src: string
    alt: string
}

export type PhotoSet = PhotoProps2[]

// Définition des props pour le composant PhotosSets
export interface PhotosSetsProps {
    photosSets: PhotoSet[]
}

// Autres types que vous aviez précédemment
export interface SubtitleProps {
    text: string
}

export interface TitleProps {
    text: string
}

export interface TextsProps {
    texts: string[] | undefined
}

export interface ButtonProps {
    text: string
}

export interface ButtonArrowRightProps {
    text?: string
}

export interface TitleCardProps {
    text: string
}

export interface CardProps {
    title: string
    description: string
    mainPhoto: PhotoProps
    id: string
}
