import TitleProjectPage from "@/components/ui/atoms/TitleProjectPage/TitleProjectPage"
import styles from "./not-found.module.scss"
import Button from "@/components/ui/atoms/Button/Button"

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <div className={styles.notFound__largeScreen}>
        <div className={styles.notFound__largeScreen__titleWrapper}>
          <TitleProjectPage text="Page non trouvée" />
        </div>
        <div className={styles.notFound__largeScreen__ButtonWrapper}>
          <Button
            text="Retourner à l'Accueil"
            link="/"
          />
        </div>
      </div>
    </section>
  )
}
