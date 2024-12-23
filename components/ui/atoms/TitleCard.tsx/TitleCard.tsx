import { TitleCardProps } from '@/types'
import styles from './title-card.module.scss'

const TitleCard = ({ text }: TitleCardProps) => {
    return <h3 className={styles.TitleCard}>{text}</h3>
}

export default TitleCard
