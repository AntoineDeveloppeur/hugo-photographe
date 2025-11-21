"use client"

import TitleProjectPage from "@/components/ui/atoms/TitleProjectPage/TitleProjectPage"
import styles from "./modifier-portfolio.module.scss"
import type { ItemsProps } from "@/types"
import Button from "@/components/ui/atoms/Button/Button"
import { useState, useEffect } from "react"
import FormAjouterPhotoNewStructure from "@/components/ui/organisms/FormAjouterPhoto/FormAjouterPhotoNewStructure"
import updatePortfolio from "@/utils/updatePortfolioNewStructure"
import { useRouter } from "next/navigation"
import useGetPortfolioNewStructure from "@/hooks/useGetPortfolioNewStructure"
import Loader from "@/components/ui/atoms/Loader/Loader"
import Paragraphes from "@/components/ui/atoms/Paragraphes/Paragraphes"
import { MultipleContainers } from "./MultipleContainers"
import fallbackPortfolioNewStructure from "@/data/fallbackPortfolioNewStructure.json"
export default function ModifierPorfolio() {
  const Router = useRouter()

  const [items, setItems] = useState<ItemsProps>(fallbackPortfolioNewStructure)

  const { isPortfolioFetching, portfolio, setPortfolio, error } =
    useGetPortfolioNewStructure()

  useEffect(() => {
    setItems(portfolio)
  }, [portfolio])

  const [modeSupprimerPhoto, setModeSupprimerPhoto] = useState<boolean>(false)

  const handleModeSupprimerPhoto = () => {
    setModeSupprimerPhoto(!modeSupprimerPhoto)
  }

  const handleSavePortfolio = async () => {
    if (!window.localStorage.getItem("token")) {
      Router.push("connexion")
      alert("Veuillez vous connecter pour modifier le portfolio")
    } else {
      const { success, error } = await updatePortfolio(
        window.localStorage.getItem("token") as string,
        items
      )
      if (error) alert(`portfolio pas mis à jour ${error}`)
      if (success) alert(`portfolio mis à jour avec succès`)
    }
  }

  return (
    <section className={styles.modifierPortfolio}>
      <div className={styles.modifierPortfolio__largeScreen}>
        <div className={styles.modifierPortfolio__largeScreen__titleWrapper}>
          <TitleProjectPage text="Modifier Portfolio" />
        </div>
        {isPortfolioFetching && <Loader />}
        {error && (
          <Paragraphes
            texts={[
              `Erreur lors de la récupération du portfolio. Voici le message d'erreur: ${error}`,
            ]}
          />
        )}
        <div className={styles.modifierPortfolio__largeScreen__columns}>
          <MultipleContainers
            deleteOption={modeSupprimerPhoto}
            items={items}
            setItems={setItems}
            minimal={true}
          />
        </div>
        <div className={styles.modifierPortfolio__largeScreen__buttonsWrapper}>
          <FormAjouterPhotoNewStructure setPortfolio={setPortfolio} />
          <Button
            text="mode supprimer photo"
            onclick={handleModeSupprimerPhoto}
          >
            <p
              className={
                styles.modifierPortfolio__largeScreen__buttonsWrapper__p
              }
            >
              {modeSupprimerPhoto ? "Désactiver" : "Activer"}&nbsp;le&nbsp;
            </p>
          </Button>
          <Button
            text="Sauvegarder Changements"
            onclick={handleSavePortfolio}
          />
        </div>
      </div>
    </section>
  )
}
