import { SubtitleProps } from '@/types'
import styles from './subtitle.module.scss'

export default function Subtitle({ text }: SubtitleProps) {
    return <h2 className={styles.subtitle}>{text}</h2>
}
