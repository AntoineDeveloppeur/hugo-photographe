import photoCtrl from "@/backend/controllers/photo.js"
import express, { Request, Response, NextFunction } from "express"
import checkToken from "@/backend/middleware/checkToken.js"

const router = express.Router()

export default router.post(
  "/upload",
  (req: Request, res: Response, next: NextFunction) => {
    checkToken(req, res, next)
  },
  (req: Request, res: Response) => {
    photoCtrl.upload(req, res)
  }
)

router.delete(
  "/delete",
  (req: Request, res: Response, next: NextFunction) => {
    checkToken(req, res, next)
  },
  (req: Request, res: Response) => {
    photoCtrl.delete(req, res)
  }
)
