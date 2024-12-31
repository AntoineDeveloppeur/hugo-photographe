import { TitleProps } from '@/types'
import styles from './title.module.scss'

const Title = ({ text }: TitleProps) => {
    return <h1 className={styles.title}>{text}</h1>
}

export default Title
