'use client'

import styles from './link-bottom-of-project-page.module.scss'
import {useContext} from 'react'
import Button from '../../atoms/Button/Button'
import { ShowPresentationContext } from '@/components/Providers'


export default function LinkBottomOfProjectPage() {
    const { setShowPresentation } = useContext(ShowPresentationContext)

    return (
        <div className={styles.Wrapper}>
        <Button text="Contacter le photographe" link='/#Contact' onclick={() => {setShowPresentation(true)}} />
        <Button text="Retourez aux projets" link="/#Projects" />
    </div>

    )
}