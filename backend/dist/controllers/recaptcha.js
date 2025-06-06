export default async function recaptcha(req, res) {
    if (!req.body.token) {
        const responseToClient = {
            success: false,
            error: 'Format de requête invalide'
        };
        return res.status(400).json(responseToClient);
    }
    if (!process.env.RECAPTCHA_SECRET_KEY) {
        const responseToClient = {
            success: false,
            error: 'Configuration du serveur manquante'
        };
        return res.status(500).json(responseToClient);
    }
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.token}`;
    try {
        const response = await fetch(verifyUrl, {
            method: 'POST'
        });
        if (!response.ok) {
            throw new Error('Échec de la vérification ReCAPTCHA');
        }
        const data = await response.json();
        if (!data.success) {
            const responseToClient = {
                success: false,
                email: '',
                phone: '',
                error: `Échec de la vérification ReCAPTCHA:' ${data['error-codes']}`
            };
            return res.status(500).json(responseToClient);
        }
        if (data.score <= 0.5) {
            const responseToClient = {
                success: false,
                email: '',
                phone: '',
                error: 'Score ReCAPTCHA trop faible:'
            };
            return res.status(403).json(responseToClient);
        }
        // Toute les erreurs vérifiées
        const responseToClient = {
            success: true,
            email: process.env.HUGO_EMAIL,
            phone: process.env.HUGO_PHONE
        };
        return res.status(200).json(responseToClient);
    }
    catch (error) {
        const errorToClient = error instanceof Error
            ? error.message :
            error;
        return res.status(502).json({ error: errorToClient });
    }
}
