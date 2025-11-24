// types.ts
import { Fields, File as FormidableFile } from "formidable"

export interface PhotoData {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
}

export interface PhotoProps {
  photo: PhotoData
  hoverEffect?: boolean
  priority?: boolean
  sizes?: string
  mainPhoto?: boolean
  blurDataURL?: string | undefined
}

export type photoSet = PhotoData[]

export interface PhotosSetsProps {
  photosSets: PhotoData[][]
}
export interface ProjectsProps {
  _id: string
  title: string
  summary: string
  mainPhoto: PhotoData
  textsAbovePhotos?: string[]
  photosSets: PhotoData[][]
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
