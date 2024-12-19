import { Lora, Baskervville, Merriweather } from 'next/font/google'

export const lora = Lora({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-lora',
    weight: '500',
})

export const baskervville = Baskervville({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-baskervville',
    weight: '400',
})

export const merriweather = Merriweather({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-merriweather',
    weight: '400',
})
