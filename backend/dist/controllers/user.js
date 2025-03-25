// Créer d'abord l'objet contrôleur
const userCtrl = {
    signUp: (req, res) => {
        // Regarder si l'adresse email existe déjà ou non
        // utiliser bcrypt pour crypté le req.body.password
        console.log('req.body.user', req.body.user);
        console.log('req.body.password', req.body.password);
        res.status(200).json({ message: "sign up faite jusqu'au bout" });
    },
    signIn: (req, res) => {
        // À implémenter - pour le moment juste un placeholder
        res.status(200).json({ message: "signIn endpoint" });
    }
};
export default userCtrl;
