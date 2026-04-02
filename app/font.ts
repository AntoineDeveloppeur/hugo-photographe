import localFont from "next/font/local"

export const lora = localFont({
  src: "../public/fonts/lora-v37-latin-500.woff2",
  variable: "--font-lora",
  display: "swap",
  weight: "500",
})

export const baskervville = localFont({
  src: "../public/fonts/baskervville-v20-latin-regular.woff2",
  variable: "--font-baskervville",
  display: "swap",
  weight: "400",
})

export const merriweather = localFont({
  src: "../public/fonts/merriweather-v33-latin-regular.woff2",
  variable: "--font-merriweather",
  display: "swap",
  weight: "400",
})

export const taviraj = localFont({
  src: "../public/fonts/Taviraj-Regular.ttf",
  variable: "--font-taviraj",
  display: "swap",
})
