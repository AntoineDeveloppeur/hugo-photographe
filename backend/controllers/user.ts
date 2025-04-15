import { Request, Response } from 'express'
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


// Créer d'abord l'objet contrôleur
const userCtrl = {
    signIn: (req: Request, res: Response) => {
        // Regarder si l'adresse email existe déjà ou non
        console.log('req.body.email', req.body.email)
        console.log('req.body.password', req.body.password)
        User.findOne({email : req.body.email})
        .then((user) => {
            console.log('après le then')
            if (!user) {
                console.log("l'utilisateur n'existe pas")
                res.status(401).json({error: "l'utilisateur n'existe pas"})
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        res.status(401).json({
                            error: 'mot de pass incorect',
                        })
                    } else {
                        res.status(200).json({
                            userId: user._id,
                            token: jwt.sign(
                                { userId: user._id },
                                process.env.SECRETPHRASEFORTOKEN, // C'est la clé secrète qui permet de générer le token
                                { expiresIn: '48h' }
                            ),
                        })
                    }
                })
                .catch((error) => {
                    res.status(500).json({ error })
                })
            })
        .catch(error => res.status(400).json({error}))
    },
    
    modifyPassword: (req: Request, res: Response) => {
        // À implémenter - pour le moment juste un placeholder
        User.findOne({email : req.body.email})
        .then((user) => {
            if (!user) {
                console.log("l'utilisateur n'existe pas")
                res.status(401).json({message: "l'utilisateur n'existe pas"})
                return;
            }
            bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
                // Mise à jour du mot de passe de l'utilisateur avec le hash
                console.log('hash',hash)
                User.updateOne(
                    { email: req.body.email },
                    { password: hash }
                )
                .then(() => res.status(200).json({ message: 'Mot de passe modifié avec succès' }))
                .catch(error => res.status(500).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    }
}

export default userCtrl