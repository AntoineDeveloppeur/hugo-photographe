import { Fields } from "formidable"

export interface FormidableFile {
  filepath: string
  originalFilename: string | null
  mimetype: string | null
  [key: string]: any
}

export interface ParsedForm {
  fields: Fields
  files: {
    [key: string]: FormidableFile
  }
}