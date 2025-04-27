import { useState, useEffect } from 'react'

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState<boolean>(false)

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        // Vérification initiale
        checkIsMobile()

        // Ajouter l'écouteur d'événement
        window.addEventListener('resize', checkIsMobile)

        // Nettoyer l'écouteur d'événement
        return () => window.removeEventListener('resize', checkIsMobile)
    }, [])

    return isMobile
}
