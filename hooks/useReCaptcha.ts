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
        // l'initialisation est vérifier car elle peut échouer, par exemple, avec une variable d'env manquante
        const verifyRecaptcha = async () => {
            if (!executeRecaptcha) {
                return
            }

            try {
                const token = await executeRecaptcha()
                console.log('token',token)

                const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/recaptcha`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({token: token})
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()
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