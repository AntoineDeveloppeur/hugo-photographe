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
            if (!executeRecaptcha) return

            try {
                const token = await executeRecaptcha()
                const response = await fetch('/api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(token)
                })

                const data = await response.json()
                setInfo(data)
            } catch (error) {
                console.error('ReCaptcha verification failed:', error)
            }
        }

        verifyRecaptcha()
    }, [executeRecaptcha])

    return info
}