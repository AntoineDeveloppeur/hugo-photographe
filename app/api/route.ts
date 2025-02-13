import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    let token: string
    
    try {
        token = await request.json()
    } catch (error) {
        console.error('Erreur de parsing du body de la requête:', error)
        return NextResponse.json({
            success: false,
            error: 'Format de requête invalide'
        }, { status: 400 })
    }

    if (!process.env.RECAPTCHA_SECRET_KEY) {
        console.error('La clé secrète ReCAPTCHA n\'est pas définie')
        return NextResponse.json({
            success: false,
            error: 'Configuration du serveur manquante'
        }, { status: 500 })
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`

    try {
        const response = await fetch(verifyUrl, {
            method: 'POST'
        })
        
        if (!response.ok) {
            console.error('Erreur de réponse ReCAPTCHA:', response.status, response.statusText)
            throw new Error('Échec de la vérification ReCAPTCHA')
        }

        const data = await response.json()
        
        if (!data.success) {
            console.log('Échec de la vérification ReCAPTCHA:', data['error-codes'])
            return NextResponse.json({
                success: false,
                email: '',
                phone: ''
            })
        }

        if (data.score <= 0.5) {
            console.log('Score ReCAPTCHA trop faible:', data.score)
            return NextResponse.json({
                success: false,
                email: '',
                phone: ''
            })
        }

        console.log('Vérification ReCAPTCHA réussie avec un score de:', data.score)
        return NextResponse.json({
            success: true,
            email: process.env.HUGO_EMAIL,
            phone: process.env.HUGO_PHONE
        })
        
    } catch (error) {
        console.error('Erreur lors de la vérification ReCAPTCHA:', error)
        return NextResponse.json({
            success: false,
            error: 'Échec de la vérification ReCAPTCHA'
        }, { status: 502 })
    }
}