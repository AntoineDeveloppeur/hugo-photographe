'use client'

import './globals.scss'
import { lora, baskervville, merriweather } from './font'
import Footer from '@/components/ui/organisms/Footer/Footer'
import Header from '@/components/ui/organisms/HeaderDesktop/HeaderDesktop'
import HeaderMobile from '@/components/ui/organisms/HeaderMobile/HeaderMobile'
import useIsMobile from '@/hooks/useIsMobile'
import { ThemeProvider } from 'next-themes'



export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const isMobile = useIsMobile()

    return (
        <html lang="en" style={{ scrollBehavior: 'smooth' }}>
            <body
                className={`${lora.variable} ${baskervville.variable} ${merriweather.variable}antialiased`}
            >
                <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
                    {isMobile ? <HeaderMobile /> : <Header /> }
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    )
}
