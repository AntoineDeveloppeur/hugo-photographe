'use client'

import { ThemeProvider } from 'next-themes'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import Header from './ui/organisms/HeaderDesktop/HeaderDesktop'
import HeaderMobile from './ui/organisms/HeaderMobile/HeaderMobile'
import Footer from './ui/organisms/Footer/Footer'
import useIsMobile from '@/hooks/useIsMobile'
import { useState, useEffect } from 'react'

export default function Providers({ children }: { children: React.ReactNode }) {
    const isMobile = useIsMobile()

    const [mounted, setMounted] = useState(false)
    
    useEffect(() => {
       setMounted(true)
     }, [])

    if (!mounted) return null

    return (
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
            <GoogleReCaptchaProvider
                reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                scriptProps={{
                    async: false,
                    defer: false,
                    appendTo: 'head',
                }}
            >
                {isMobile ? <HeaderMobile /> : <Header />}
                <main>
                    {children}
                </main>
                <Footer />
            </GoogleReCaptchaProvider>
        </ThemeProvider>
    )
}
