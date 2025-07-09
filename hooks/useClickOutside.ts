"use client"

import { useEffect, RefObject } from "react"

/**
 * Hook personnalisé pour détecter les clics en dehors d'un élément
 * @param ref - Référence à l'élément à surveiller
 * @param handler - Fonction à exécuter lors d'un clic en dehors de l'élément
 */
export default function useClickOutside(
  ref: RefObject<HTMLElement>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Si la ref n'existe pas ou si le clic est à l'intérieur de l'élément, on ne fait rien
      // La ref du composant peut ne pas exister au premier rendu pendant un court instant
      // Typescript protège déjà contre cette effet mais il est bon de s'en rappeler
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }

      handler()
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler]) // Re-exécuter l'effet si la ref ou le handler change
}
