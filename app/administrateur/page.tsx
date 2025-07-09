import TitleProjectPage from "@/components/ui/atoms/TitleProjectPage/TitleProjectPage"
import styles from "./administrateur.module.scss"
import Button from "@/components/ui/atoms/Button/Button"

export default function Administrateur() {
  return (
    <section className={styles.administrateur}>
      <div className={styles.administrateur__largeScreen}>
        <div className={styles.administrateur__largeScreen__titleWrapper}>
          <TitleProjectPage text="Administrateur" />
        </div>
        <Button
          text="Ajouter un Projet"
          link={"/ajouterProjet"}
        />
        <Button
          text="Supprimer un Projet"
          link={"/supprimerProjet"}
        />
      </div>
    </section>
  )
}
