import { Request, Response } from "express"
import PortfolioNewStructure from "@/backend/models/portfolio.js"
import formatError from "@/backend/utils/formatError.js"

const portfolioCtrl = {
  update: async (req: Request, res: Response) => {
    try {
      await PortfolioNewStructure.findOneAndUpdate(
        {},
        { portfolioNewStructure: req.body },
        {
          upsert: true,
        }
      )
      res.status(201).json({ message: "porfolio mis à jour" })
    } catch (error) {
      const errorMessage = formatError(error)
      res.status(500).json({ error: errorMessage })
    }
  },
  getPortfolio: async (req: Request, res: Response) => {
    PortfolioNewStructure.find()
      .then((data) => {
        res.status(200).json({ photos: data[0].portfolioNewStructure })
      })
      .catch((error) => {
        const errorMessage = formatError(error)
        res.status(500).json({ error: errorMessage })
      })
  },
}

export default portfolioCtrl
