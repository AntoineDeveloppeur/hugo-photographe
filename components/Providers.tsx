'use client'

import { ThemeProvider } from 'next-themes'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import Header from './ui/organisms/HeaderDesktop/HeaderDesktop'
import HeaderMobile from './ui/organisms/HeaderMobile/HeaderMobile'
import Footer from './ui/organisms/Footer/Footer'
import useIsMobile from '@/hooks/useIsMobile'

export default function Providers({ children }: { children: React.ReactNode }) {
    const isMobile = useIsMobile()

    return (
        <ThemeProvider>
            <GoogleReCaptchaProvider
                reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                scriptProps={{
                    async: false,
                    defer: false,
                    appendTo: 'head',
                }}
            >
                {isMobile ? <HeaderMobile /> : <Header />}
                {children}
                <Footer />
            </GoogleReCaptchaProvider>
        </ThemeProvider>
    )
}
