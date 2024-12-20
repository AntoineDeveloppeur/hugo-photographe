import { TitleProps } from '@/types'
import styles from './title.module.scss'

export default function Title({ content }: TitleProps) {
    return <h1 className={styles.title}>{content}</h1>
}
