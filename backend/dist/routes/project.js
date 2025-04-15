import express from 'express';
import createProject from '../controllers/project.js';
const router = express.Router();
// Use the createProject function as middleware with proper type handling
router.post('/create', (req, res, next) => {
    createProject(req, res).catch(next);
});
export default router;
