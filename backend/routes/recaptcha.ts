import express, { Request, Response } from 'express'
import recaptcha from '../controllers/recaptcha.js'

const router = express.Router()

export default router.post('/',(req: Request, res: Response) => {recaptcha(req, res)})

