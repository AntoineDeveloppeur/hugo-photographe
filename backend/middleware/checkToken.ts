import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export default function checkToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization // récupérer token dans header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message: "Authentification requise"})
    }
    const token = authHeader.split(' ')[1];
    try {
        jwt.verify(token, process.env.SECRET_PHRASE_TOKEN)
        next()
        return
    } catch {
        return res.status(403).json({message: "Vous n'êtes pas autorisé à créer un projet, veuillez vous connecter. Si le problème persiste, contacter votre administrateur web"})
        // Ajouter au frontend la redirection vers la page de connexion
    }
}
