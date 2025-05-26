import express, { Request, Response, NextFunction } from 'express'
import { createProject, getProjects, deleteProject } from '../controllers/project.js'
import checkToken from '../middleware/checkToken.js'

const router = express.Router()

// Use the createProject function as middleware with proper type handling
router.post('/create',  
    (req: Request, res: Response, next: NextFunction) => {
        checkToken(req, res, next)}, 
    (req: Request, res: Response) => {
        createProject(req, res)})

router.get('/getProjects', (req: Request, res: Response) => {
    getProjects(req, res)
})

router.delete('deleteProject',  
    (req: Request, res: Response, next: NextFunction) => {
        checkToken(req, res, next)}, 
    (req: Request, res: Response) => {
            deleteProject(req, res)})

export default router