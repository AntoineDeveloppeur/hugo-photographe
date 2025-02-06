import { useEffect, RefObject } from 'react'

/**
 * Hook personnalisé pour détecter les clics en dehors d'un élément
 * @param ref - Référence à l'élément à surveiller
 * @param handler - Fonction à exécuter lors d'un clic en dehors de l'élément
 */
function useClickOutside(ref: RefObject<HTMLElement>, handler: () => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Si la ref n'existe pas ou si le clic est à l'intérieur de l'élément, on ne fait rien
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      
      handler()
    }

    // Ajout des event listeners pour les clics souris et les événements tactiles
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    // Nettoyage des event listeners lors du démontage du composant
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler]) // Re-exécuter l'effet si la ref ou le handler change
}

export default useClickOutside
