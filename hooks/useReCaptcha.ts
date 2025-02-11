import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useState, useEffect } from 'react'

interface ReCaptchaResponse {
    success: boolean
    name: string
    email: string
    phone: string
}

export default function useReCaptcha() {
    const { executeRecaptcha } = useGoogleReCaptcha()
    const [info, setInfo] = useState<ReCaptchaResponse>({
        success: false,
        name: '',
        email: '',
        phone: ''
    })

    useEffect(() => {
        const verifyRecaptcha = async () => {
            if (!executeRecaptcha) {
                console.log('ReCaptcha not yet initialized')
                return
            }

            try {
                console.log('Executing ReCaptcha...')
                const token = await executeRecaptcha()
                console.log('Token obtained:', token)

                const response = await fetch('/api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(token)
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()
                console.log('API Response:', data)
                setInfo(data)
            } catch (error) {
                console.error('ReCaptcha verification failed:', error)
                setInfo({
                    success: false,
                    name: '',
                    email: '',
                    phone: ''
                })
            }
        }

        verifyRecaptcha()
    }, [executeRecaptcha])

    return info
}