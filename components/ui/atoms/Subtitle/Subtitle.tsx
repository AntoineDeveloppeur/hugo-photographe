import styles from './subtitle.module.scss'

export default function Subtitle({ content }: { content: String }) {
    return <h2 className={styles.subtitle}>{content}</h2>
}
