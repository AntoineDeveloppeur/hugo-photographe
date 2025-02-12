import Portfolio from '@/components/ui/organisms/Portfolio/Portfolio'
import styles from './page.module.scss'
import Contact from '@/components/ui/organisms/Contact/Contact'
import ProjetSectionLandscape from '@/components/ui/organisms/ProjetSectionLandscape/ProjetSectionLandscape'


export default function Home() {
    return (
        <div className={styles.pages}>
            <Portfolio />
            <ProjetSectionLandscape />
            <Contact />
        </div>
    )
}
