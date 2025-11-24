import Portfolio from "@/components/ui/organisms/Portfolio/Portfolio"
import styles from "./page.module.scss"
import Contact from "@/components/ui/organisms/Contact/Contact"
import ProjectSection from "@/components/ui/organisms/ProjectSection/ProjectSection"
import Portfolio from "@/components/ui/organisms/Portfolio/Portfolio"

export default function Home() {
  return (
    <div className={styles.pages}>
      <Portfolio />
      <ProjectSection />
      <Contact />
    </div>
  )
}
