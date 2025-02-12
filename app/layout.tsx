import './globals.scss'
import { lora, baskervville, merriweather } from './font'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Hugo Photographe',
    description: 'Portfolio de Hugo Randez, photographe professionnel',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="fr">
            <body className={`${lora.variable} ${baskervville.variable} ${merriweather.variable} antialiased`}>
                {children}
            </body>
        </html>
    )
}
