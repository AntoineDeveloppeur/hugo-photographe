import './globals.scss'
import { lora, baskervville, merriweather } from './font'
import { Metadata } from 'next'
import Providers from '@/components/Providers'

// Récupérer l'URL de base à partir d'une variable d'environnement ou utiliser l'URL de base par défaut
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://photographe-hugo-randez.fr'

export const metadata: Metadata = {
    title: 'Photographe du monde Hugo Randez',
    description: 'Découvrez des destinations exotiques et vivez des aventures uniques avec les photos de voyage de Hugo Randez. Une expérience visuelle inoubliable.',
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon.ico',
        apple: '/apple-icon.png',
    },
    openGraph: {
        title: 'Photographe du monde Hugo Randez',
        description: 'Découvrez des destinations exotiques et vivez des aventures uniques avec les photos de voyage de Hugo Randez. Une expérience visuelle inoubliable.',
        url: baseUrl,
        siteName: 'Photographe du monde Hugo Randez',
        images: [
            {
                url: `${baseUrl}/images/og-image.jpg`,
                width: 1200,
                height: 630,
                alt: 'Hugo Randez Photographe',
            },
        ],
        locale: 'fr_FR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Photographe du monde Hugo Randez',
        description: 'Découvrez des destinations exotiques et vivez des aventures uniques avec les photos de voyage de Hugo Randez. Une expérience visuelle inoubliable.',
        images: [`${baseUrl}/images/twitter-image.jpg`],
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="fr">
            <body className={`${lora.variable} ${baskervville.variable} ${merriweather.variable} antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
