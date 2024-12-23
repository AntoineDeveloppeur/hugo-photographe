import { TitleProps } from '@/types'
import styles from './title.module.scss'

export default function Title({ text }: TitleProps) {
    return <h1 className={styles.title}>{text}</h1>
}
