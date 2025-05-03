import express, { Request, Response } from 'express'
import { AuthRequest,createProject, getProjects } from '../controllers/project.js'

const router = express.Router()

// Use the createProject function as middleware with proper type handling
router.post('/create', (req: Request, res: Response) => {
  createProject(req as AuthRequest, res)
})

router.get('/getProjects', (req: Request, res: Response) => {
  getProjects(req, res)
})

export default router