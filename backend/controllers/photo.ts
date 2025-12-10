import parseForm from "@/backend/utils/parseForm.js"
import uploadPhoto from "@/backend/utils/uploadPhoto.js"
import formatError from "@/backend/utils/formatError.js"
import { Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"
import { deleteOnePhotoFromDB } from "@/backend/utils/deletePhotos.js"

const photoCtrl = {
  upload: async (req: Request, res: Response) => {
    try {
      const { files } = await parseForm(req)
      const file = files["photo"]

      const url = await uploadPhoto(file)

      const data = {
        id: uuidv4(),
        url: url,
        width: file.width,
        height: file.height,
      }
      res.status(201).json({ data: data })
    } catch (error) {
      const errorMessage = formatError(error)
      res.status(500).json({ error: errorMessage })
    }
  },
  delete: async (req: Request, res: Response) => {
    const { success, error } = await deleteOnePhotoFromDB(req.body.url)
    if (success) {
      res.status(200).json({})
    } else {
      res.status(500).json({ error })
    }
  },
}

export default photoCtrl
