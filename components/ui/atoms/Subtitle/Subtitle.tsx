import { SubtitleProps } from '@/types'
import styles from './subtitle.module.scss'

export default function Subtitle({ content }: SubtitleProps) {
    return <h2 className={styles.subtitle}>{content}</h2>
}
