export interface SubtitleProps {
    text: string
}

export interface TitleProps {
    text: string
}

export interface PhotoProps {
    photo: { src: string; alt: string }
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
    mainPhoto: { src: string; alt: string }
}
