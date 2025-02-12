import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const token = await request.json()
    } catch (error) {
        console.error('Invalid request body:', error)
        return NextResponse.json(
            { 
                success: false, 
                error: 'Invalid request format' 
            }, 
            { status: 400 }
        )
    }

    try {
        if (!process.env.RECAPTCHA_SECRET_KEY) {
            throw new Error('RECAPTCHA_SECRET_KEY is not defined')
        }
    } catch (error) {
        console.error('RECAPTCHA_SECRET_KEY is not defined', error)
        return NextResponse.json(
            { success : false,
                error : 'RECAPTCHA SECRET KEY is not defined'
            },
            {
                status: 500
            }
        )
    }
        
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
        

    try {

        const response = await fetch(verifyUrl, {
            method: 'POST'
        })
        
        const data = await response.json()
    } catch(error) {
        console.error('Problem when verifying token + secret key with ReCaptcha service', error)
        return NextResponse.json({ success: false, error: 'Problem when verifying token + secret key with ReCaptcha service'}, {status: 502})
    }
        
        if (data.success && data.score > 0.5) {
            console.log('Verification successful')
            return NextResponse.json({
                success: true,
                name: process.env.HUGO_NAME,
                email: process.env.HUGO_EMAIL,
                phone: process.env.HUGO_PHONE
            })
        }
        
        console.log('Verification failed')
        return NextResponse.json({
            success: false,
            name: '',
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