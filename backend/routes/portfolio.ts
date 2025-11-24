import express from "express"
import portfolioCtrl from "@/backend/controllers/portfolio.js"
import { Request, Response, NextFunction } from "express"
import checkToken from "@/backend/middleware/checkToken.js"
const router = express.Router()

router.put(
  "/update",
  (req: Request, res: Response, next: NextFunction) => {
    checkToken(req, res, next)
  },
  (req: Request, res: Response) => {
    portfolioCtrl.update(req, res)
  }
)

router.get("/getPortfolio", (req: Request, res: Response) => {
  portfolioCtrl.getPortfolio(req, res)
})

export default router
