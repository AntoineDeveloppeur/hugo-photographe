import { Request, Response } from 'express';

// Créer d'abord l'objet contrôleur
const userCtrl = {
    signUp: (req: Request, res: Response) => {
        // Regarder si l'adresse email existe déjà ou non
        if (req.body.user )
        // utiliser bcrypt pour crypté le req.body.password
        console.log('req.body.user', req.body.user)
        console.log('req.body.password', req.body.password)
        res.status(200).json({message: "sign up faite jusqu'au bout"})
    },
    
    signIn: (req: Request, res: Response) => {
        // À implémenter - pour le moment juste un placeholder
        res.status(200).json({message: "signIn endpoint"})
    }
};

export default userCtrl