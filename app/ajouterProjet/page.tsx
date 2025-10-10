import TitleProjectPage from "@/components/ui/atoms/TitleProjectPage/TitleProjectPage"
import styles from "./ajouter-projet.module.scss"
import FormAjouterProjet from "@/components/ui/organisms/FormAjouterProjet/FormAjouterProjet"

export default function AjouterProjet() {
  return (
    <section className={styles.ajout}>
      <div className={styles.ajout__largeScreen}>
        <div className={styles.ajout__largeScreen__titleWrapper}>
          <TitleProjectPage text="Ajouter un projet" />
        </div>
        <FormAjouterProjet />
      </div>
    </section>
  )
}
