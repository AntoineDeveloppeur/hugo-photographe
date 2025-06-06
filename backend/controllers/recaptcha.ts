import { Request, Response } from 'express'


export default async function recaptcha(req: Request, res: Response) {

    if (!req.body.token) {
        const responseToClient = {
            success: false,
            error: 'Format de requête invalide'
        }
        res.status(400).json(responseToClient)
    }
    if (!process.env.RECAPTCHA_SECRET_KEY) {
        const responseToClient = {
            success: false,
            error: 'Configuration du serveur manquante'
        }
        res.status(500).json(responseToClient)
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.token}`

    try {
        const response = await fetch(verifyUrl, {
            method: 'POST'
        })
        
        if (!response.ok) {
            throw new Error('Échec de la vérification ReCAPTCHA')
        }
        const data = await response.json()
        
        if (!data.success) {
            const responseToClient = {
                success: false,
                email: '',
                phone: '',
                error: `Échec de la vérification ReCAPTCHA:' ${data['error-codes']}`
            }
            res.status(500).json(responseToClient)
        }

        if (data.score <= 0.5) {
            const responseToClient = {
                success: false,
                email: '',
                phone: '',
                error: 'Score ReCAPTCHA trop faible:'
            }
            res.status(403).json(responseToClient)
        }

        // Toute les erreurs vérifiées
        const responseToClient = {
            success: true,
            email: process.env.HUGO_EMAIL,
            phone: process.env.HUGO_PHONE
        }
        res.status(200).json(responseToClient)
    } catch (error) {
        const errorToClient = error instanceof Error 
        ? error.message :
        error
        res.status(502).json({ error : errorToClient })
    }
}