import { parseForm, processPhotos } from "@/backend/dist/middleware/upload"
import sharp, { metadata } from "sharp"
import { v4 as uuidv4, mockUuidValue } from "uuid"
import { convertToWebp } from "@/backend/dist/utils/convertToWebp.js"
import { resizePhoto } from "@/backend/dist/utils/resizePhoto.js"

jest.mock("sharp")
