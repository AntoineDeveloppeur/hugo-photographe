import styles from './title.module.scss'

export default function Title({ content }: { content: string }) {
    return <h1 className={styles.title}>{content}</h1>
}
