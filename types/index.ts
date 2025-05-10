// types.ts

export interface PhotoVariableProps {
    src: string
    alt: string
    width: number
    height: number
    priority?: boolean
}

export interface PhotoProps {
    photo: PhotoVariableProps
    hoverEffect?: boolean
    priority?: boolean
    sizes?: string
    mainPhoto?: boolean
    blurDataURL?: string | undefined
}

export type photoSet = PhotoVariableProps[]

export interface PhotosSetsProps {
    photosSets: PhotoVariableProps[][]
}

export interface DataType {
    galeryDesktop: PhotoVariableProps[][];
    galeryTablet: PhotoVariableProps[][];
    galeryMobile: PhotoVariableProps[][];
}


// Définition des props pour le composant PhotosSets

export interface SubtitleProps {
    text: string
}

export interface TitleProps {
    text: string
}

export interface TextsProps {
    texts: string[]
}

export interface ButtonProps {
    text: string
    link?: string
    type?: "button" | "submit" | "reset" | undefined
    disabled?: boolean
    onclick?: () => void
}

export interface ButtonArrowProps {
    text?: string
    link?: string
    direction: 'left' | 'right'
}

export interface TitleCardProps {
    text: string
}

export interface CardProps {
    title: string
    summary: string
    mainPhoto: PhotoVariableProps
    id: string
}

export type GaleryType = 'galeryDesktop' | 'galeryTablet' | 'galeryMobile';

export type Theme = "light" | "dark"

export interface projectsProps {
    _id: string 
    title: string 
    summary: string 
    mainPhoto: PhotoVariableProps 
    textsAbovePhotos?: string[]
    photosSets: PhotoVariableProps[][] 
    textsBelowPhotos?: string[] 
}
