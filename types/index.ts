// types.ts
import { ReactNode, Dispatch, SetStateAction } from "react"

export interface PhotoVariableProps {
  id?: string
  column?: string
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
}

export type PhotoProps = {
  photo: PhotoVariableProps
  hoverEffect?: boolean
  priority?: boolean
  sizes?: string
  mainPhoto?: boolean
  blurDataURL?: string | undefined
  deleteOption?: boolean
  setPortfolio?: Dispatch<SetStateAction<PhotoVariableProps[]>>
}

export type photoSet = PhotoVariableProps[]

export interface PhotosSetsProps {
  photosSets: PhotoVariableProps[][]
}

export interface ModalProps {
  isOpen: boolean
  onClose: any
  children: ReactNode
}

export interface ModalDeleteProjectProps {
  _id: string | URL
  title?: string
  isOpen: boolean
  onClose: () => void
}

export interface DataType {
  galeryDesktop: PhotoVariableProps[][]
  galeryTablet: PhotoVariableProps[][]
  galeryMobile: PhotoVariableProps[][]
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
  onclick?: any
  icon?: "add" | "delete"
  children?: ReactNode
}

export interface ButtonArrowProps {
  text?: string
  link?: string
  direction: "left" | "right"
}

export interface TitleCardProps {
  text: string
}

export interface CardProps {
  title: string
  summary: string
  mainPhoto: PhotoVariableProps
  _id: string
  deleteOption?: boolean
}

export type GaleryType = "galeryDesktop" | "galeryTablet" | "galeryMobile"

export type Theme = "light" | "dark"

export interface ProjectsProps {
  _id: string
  title: string
  summary: string
  mainPhoto: PhotoVariableProps
  textsAbovePhotos?: string[]
  photosSets: PhotoVariableProps[][]
  textsBelowPhotos?: string[]
}

export interface Data {
  projects: ProjectsProps[]
}

export interface ColumnType {
  column: string
}
