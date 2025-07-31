// types.ts
import { ReactNode } from "react"

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
