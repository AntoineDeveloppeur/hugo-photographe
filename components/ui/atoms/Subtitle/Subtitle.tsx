import { TitleProps } from '@/types'
import styles from './subtitle.module.scss'

export default function Subtitle({ text }: TitleProps) {
    return <h2 className={styles.subtitle}>{text}</h2>
}
