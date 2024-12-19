import styles from '.portfolio.module.scss'
import Title from '@/components/ui/atoms/Title/Title'
import Subtitle from '../../atoms/Subtitle/Subtitle'

export default function () {
    return (
        <Porfolio>
            <TitleWithSubtitle>
                <Title />
                <Subtitle />
            </TitleWithSubtitle>
        </Porfolio>
    )
}
