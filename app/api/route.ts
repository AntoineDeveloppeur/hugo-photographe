import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const token = await request.json()
        
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
        
        const response = await fetch(verifyUrl, {
            method: 'POST'
        })
        
        const data = await response.json()
        
        if (data.success && data.score > 0.5) {
            return NextResponse.json({
                success: true,
                name: process.env.HUGO_NAME,
                email: process.env.HUGO_EMAIL,
                phone: process.env.HUGO_PHONE
            })
        }
        
        return NextResponse.json({
            success: false,
            name: '',
            email: '',
            phone: ''
        })
        
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: 'Failed to verify reCAPTCHA'
        })
    }
}