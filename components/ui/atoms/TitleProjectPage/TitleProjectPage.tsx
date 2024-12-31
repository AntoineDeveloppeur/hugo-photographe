import { TitleProps } from '@/types'
import styles from './title-project-page.module.scss'

const TitleProjectPage = ({ text }: TitleProps) => {
    return <h1 className={styles.titleProjectPage}>{text}</h1>
}

export default TitleProjectPage
