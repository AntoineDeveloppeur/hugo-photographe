import { TextsProps } from '@/types'
import styles from './paragraphes.modules.scss'
const Paragraphes = ({ texts }: TextsProps) => {
    return (
        <div className={styles.paragraphes}>
            {texts.map((text, index) => (
                <p key={`text${index}`} className={styles.paragraphes__text}>
                    {text}
                </p>
            ))}
        </div>
    )
}

export default Paragraphes
