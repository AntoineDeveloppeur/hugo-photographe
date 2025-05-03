import express from 'express';
import { createProject, getProjects } from '../controllers/project.js';
const router = express.Router();
// Use the createProject function as middleware with proper type handling
router.post('/create', (req, res) => {
    createProject(req, res);
});
router.get('/getProjects', (req, res) => {
    getProjects(req, res);
});
export default router;
