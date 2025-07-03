"use client"

import styles from "./providers.module.scss"
import { ThemeProvider } from "next-themes"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import Header from "./ui/organisms/HeaderDesktop/HeaderDesktop"
import HeaderMobile from "./ui/organisms/HeaderMobile/HeaderMobile"
import Footer from "./ui/organisms/Footer/Footer"
import useIsMobile from "@/hooks/useIsMobile"
import { useState, useEffect, createContext } from "react"

type ShowPresentationContextType = {
  showPresentation: boolean
  setShowPresentation: (show: boolean) => void
}

export const ShowPresentationContext =
  createContext<ShowPresentationContextType>({
    showPresentation: false,
    setShowPresentation: () => {},
  })

export default function Providers({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()

  const [showPresentation, setShowPresentation] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = window.localStorage.getItem("showPresentation")
      return saved ? JSON.parse(saved) : false
    }
    return false
  })

  useEffect(() => {
    window.localStorage.setItem(
      "showPresentation",
      JSON.stringify(showPresentation)
    )
  }, [showPresentation])

  // Permet de return le composant seulement lorsque le html a été monté.
  // Cela évite les conflits avec ThemeProvider
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null

  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
    >
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: "head",
        }}
      >
        <ShowPresentationContext.Provider
          value={{ showPresentation, setShowPresentation }}
        >
          <div className={styles.pageWrapper}>
            {isMobile ? <HeaderMobile /> : <Header />}
            <main className={styles.pageWrapper__main}>{children}</main>
            <Footer />
          </div>
        </ShowPresentationContext.Provider>
      </GoogleReCaptchaProvider>
    </ThemeProvider>
  )
}
