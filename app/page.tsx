import Portfolio from '@/components/ui/organisms/Portfolio/Portfolio'
import styles from './page.module.scss'
import ProjetSection from '@/components/ui/organisms/ProjetSection/ProjetSection'
import Contact from '@/components/ui/organisms/Contact/Contact'

const Home = () => {
    return (
        <div className={styles.pages}>
            <Portfolio />
            <ProjetSection />
            <Contact />
        </div>
    )
}

export default Home
