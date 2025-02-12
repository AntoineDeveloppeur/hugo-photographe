import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const token = await request.json()
        
        if (!process.env.RECAPTCHA_SECRET_KEY) {
            console.error('RECAPTCHA_SECRET_KEY is not defined')
            throw new Error('RECAPTCHA_SECRET_KEY is not defined')
        }
        
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
        
        const response = await fetch(verifyUrl, {
            method: 'POST'
        })
        
        const data = await response.json()
        
        if (data.success && data.score > 0.5) {
            console.log('Verification successful')
            return NextResponse.json({
                success: true,
                email: process.env.HUGO_EMAIL,
                phone: process.env.HUGO_PHONE
            })
        }
        
        console.log('Verification failed')
        return NextResponse.json({
            success: false,
            email: '',
            phone: ''
        })
        
    } catch (error) {
        console.error('API route error:', error)
        return NextResponse.json({
            success: false,
            error: 'Failed to verify reCAPTCHA'
        }, { status: 500 })
    }
}