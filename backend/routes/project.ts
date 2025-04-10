import express, { Request, Response, NextFunction } from 'express'
import createProject, { AuthRequest } from '../controllers/project.js'

const router = express.Router()

// Use the createProject function as middleware with proper type handling
router.post('/create', (req: Request, res: Response, next: NextFunction) => {
  createProject(req as AuthRequest, res).catch(next);
})

export default router