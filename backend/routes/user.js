import express from 'express';

const router = express.Router();

// Contrôleur temporaire jusqu'à ce que la configuration TypeScript soit corrigée
const userCtrl = {
    signUp: (req, res) => {
        console.log('req.body.user', req.body.user);
        console.log('req.body.password', req.body.password);
        res.status(200).json({message: "sign up faite jusqu'au bout"});
    },
    
    signIn: (req, res) => {
        res.status(200).json({message: "signIn endpoint"});
    }
};

router.post('/signIn', userCtrl.signIn);
router.post('/signUp', userCtrl.signUp);

export default router;
