import type { NextApiRequest, NextApiResponse } from "next"
import fetch from 'node-fetch'

// app.post('/api', async (req, res) => {
export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    const { token } = req.body

    if (!token) {
        return res
            .status(400)
            .json({ success: false, message: 'Token manquant.' })
    }

    try {
        const response = await fetch(
            `https://www.google.com/recaptcha/api/siteverify`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    secret: process.env.RECAPTCHA_SECRET_KEY,
                    response: token,
                }),
            }
        )

        const data = await response.json() // Parsez la réponse JSON

        const { success, score } = data

        if (success && score >= 0.5) {
            // Validation réussie (score > 0.5 recommandé)
            return res.json({
                success: true,
                message: 'reCAPTCHA validé.',
                name: process.env.HUGO_NAME,
                email: process.env.HUGO_EMAIL,
                phone: process.env.HUGO_PHONE
            })
        } else {
            // Échec de la validation
            console.log('echec de la validation du captache')
            return res.status(400).json({
                success: false,
                message: 'Validation échouée.',
                score: score || 0,
            })
        }
    } catch (error) {
        console.error('Erreur lors de la vérification reCAPTCHA :', error)
        return res
            .status(500)
            .json({ success: false, message: 'Erreur serveur.' })
    }
}