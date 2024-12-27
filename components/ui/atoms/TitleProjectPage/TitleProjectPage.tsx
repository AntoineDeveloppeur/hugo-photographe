import { TitleProps } from '@/types'
import styles from './title-project-page.module.scss'

export default function TitleProjectPage({ text }: TitleProps) {
    return <h1 className={styles.titleProjectPage}>{text}</h1>
}
