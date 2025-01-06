// types.ts

export interface PhotosSetsProps {
    photosSets: photoSet[]
}
export type photoSet = PhotoVariableProps[]

export interface PhotoVariableProps {
    src: string
    alt: string
}

export interface PhotoProps {
    photo: PhotoVariableProps
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
}

export interface ButtonArrowRightProps {
    text?: string
    link?: string
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

export let params: string
