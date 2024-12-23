import Portfolio from '@/components/ui/organisms/Portfolio/Portfolio'
import styles from './page.module.scss'
import ProjetSection from '@/components/ui/organisms/ProjetSection/ProjetSection'

export default function Home() {
    return (
        <div className={styles.pages}>
            <Portfolio />
            <ProjetSection />
        </div>
    )
}
