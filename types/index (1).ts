// types.ts

export interface PhotoVariableProps {
    src: string
    alt: string
}
export interface PhotoProps {
    photo: PhotoVariableProps
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
    description: string
    mainPhoto: PhotoProps
    id: string
}

export type GaleryType = 'galeryDesktop' | 'galeryTablet' | 'galeryMobile';

export let params: string

export interface projectProps {
    id: string
    title: string
    description: string
    mainPhoto : PhotoVariableProps
    textsAbovePhotos : string[]
    photosSets : PhotoVariableProps[][]
    textsBelowPhotos : string[]
}
