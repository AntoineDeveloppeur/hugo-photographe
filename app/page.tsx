import Portfolio from '@/components/ui/organisms/Portfolio/Portfolio'
import styles from './page.module.scss'

export default function Home() {
    return (
        <div className={styles.pages}>
            <Portfolio />
        </div>
    )
}
