"use client"

import TitleProjectPage from "@/components/ui/atoms/TitleProjectPage/TitleProjectPage"
import styles from "./modifier-portfolio.module.scss"
import type { PhotoVariableProps, ColumnType } from "@/types"
import Button from "@/components/ui/atoms/Button/Button"
import { useState } from "react"
import { ColonneModifierPortfolio } from "@/components/ui/molecules/ColonneModifierPortfolio/ColonneModifierPortfolio"
import { DragEndEvent, DndContext } from "@dnd-kit/core"
import FormAjouterPhoto from "@/components/ui/organisms/FormAjouterPhoto/FormAjouterPhoto"
import updatePortfolio from "@/utils/updatePortfolio"
import { useRouter } from "next/navigation"
import useGetPortfolio from "@/hooks/useGetPortfolio"
import Loader from "@/components/ui/atoms/Loader/Loader"
import Paragraphes from "@/components/ui/atoms/Paragraphes/Paragraphes"

export default function ModifierPorfolio() {
  const Router = useRouter()

  const columns: ColumnType[] = [
    { column: "1" },
    { column: "2" },
    { column: "3" },
  ]

  const { isPortfolioFetching, portfolio, setPortfolio, error } =
    useGetPortfolio()

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
        portfolio
      )
      if (error) alert(`portfolio pas mis à jour ${error}`)
      if (success) alert(`portfolio mis à jour avec succès`)
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    const photoId = active.id as string
    const newStatus = over.id as PhotoVariableProps["column"]
    setPortfolio((prevPortfolio) =>
      prevPortfolio.map((prevPhoto) =>
        prevPhoto.id === photoId
          ? { ...prevPhoto, column: newStatus }
          : prevPhoto
      )
    )
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
          <DndContext onDragEnd={handleDragEnd}>
            {columns.map((column: ColumnType) => {
              return (
                <ColonneModifierPortfolio
                  key={column.column}
                  column={column}
                  photos={portfolio.filter(
                    (photo) => photo.column === column.column
                  )}
                  deleteOption={modeSupprimerPhoto}
                  setPortfolio={setPortfolio}
                />
              )
            })}
          </DndContext>
        </div>
        <div className={styles.modifierPortfolio__largeScreen__buttonsWrapper}>
          <FormAjouterPhoto
            photos={portfolio}
            setPortfolio={setPortfolio}
          />
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
