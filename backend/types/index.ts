// types.ts
import { Fields, File as FormidableFile } from "formidable"

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

// Types pour formidable
export interface File extends FormidableFile {
  filepath: string
  originalFilename: string | null
  mimetype: string | null
  width?: number
  height?: number
}

export interface Files {
  [key: string]: File
}

export interface ParsedForm {
  fields: Fields
  files: Files
}
