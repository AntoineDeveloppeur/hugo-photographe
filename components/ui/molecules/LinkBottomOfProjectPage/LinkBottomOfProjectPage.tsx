'use client'

import styles from './link-bottom-of-project-page.module.scss'
import {useContext} from 'react'
import Button from '../../atoms/Button/Button'
import { ShowPresentationContext } from '@/components/Providers'
import { useRouter } from 'next/navigation'

export default function LinkBottomOfProjectPage() {
    const { setShowPresentation } = useContext(ShowPresentationContext)
    const router = useRouter()

    const handleContactClick = () => {
        setShowPresentation(true)
        router.push('/#Contact')
    }

    return (
        <div className={styles.Wrapper}>
        <Button text="Contacter le photographe" onclick={handleContactClick} />
        <Button text="Retourner aux projets" link="/#Projects" />
        </div>
    )
}