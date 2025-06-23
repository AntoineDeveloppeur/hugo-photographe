import { Lora, Baskervville, Merriweather } from 'next/font/google'
import localFont from 'next/font/local'

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

export const taviraj = localFont({
  src: '../public/fonts/Taviraj-Regular.ttf',
  variable: '--font-taviraj',
})

// export const corben = localFont({
//   src: '../public/fonts/Corben-Regular.ttf',
//   variable: '--font-corben',
// })
