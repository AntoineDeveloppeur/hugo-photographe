import express from 'express';
import { createProject, getProjects, deleteProject } from '../controllers/project.js';
import checkToken from '../middleware/checkToken.js';
const router = express.Router();
// Use the createProject function as middleware with proper type handling
router.post('/create', (req, res, next) => {
    checkToken(req, res, next);
}, (req, res) => {
    createProject(req, res);
});
router.get('/getProjects', (req, res) => {
    getProjects(req, res);
});
router.delete('/deleteProject/:id', (req, res, next) => {
    checkToken(req, res, next);
}, (req, res) => {
    deleteProject(req, res);
});
export default router;
