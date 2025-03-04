import Portfolio from '@/components/ui/organisms/Portfolio/Portfolio'
import styles from './page.module.scss'
import Contact from '@/components/ui/organisms/Contact/Contact'
import ProjetSection from '@/components/ui/organisms/ProjetSection/ProjetSection'


export default function Home() {
    return (
        
        <div className={styles.pages}>
            <Portfolio />
            <ProjetSection />
            <Contact />
        </div>
    )
}
