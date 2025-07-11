import jwt from 'jsonwebtoken';
export default function checkToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Authentification requise" });
    }
    const token = authHeader.split(' ')[1];
    if (!process.env.SECRET_PHRASE_TOKEN) {
        return res.status(500).json({ message: "variable d'environnement manquante: jwt secret phrase" });
    }
    try {
        jwt.verify(token, process.env.SECRET_PHRASE_TOKEN);
        next();
        return;
    }
    catch (error) {
        return res.status(403).json({ message: "Vous n'êtes pas autorisé, veuillez vous connecter. Si le problème persiste, contacter votre administrateur web", error: error });
        // Ajouter au frontend la redirection vers la page de connexion
    }
}
