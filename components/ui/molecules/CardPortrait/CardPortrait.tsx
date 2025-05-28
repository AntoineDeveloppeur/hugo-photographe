'use client'

import styles from './card-portrait.module.scss'
import PhotoBasic from '../../atoms/PhotoBasic/PhotoBasic'
import TitleCard from '../../atoms/TitleCard/TitleCard'
import Link from 'next/link'
import { CardProps } from '@/types/index.js'
import IconDelete from '../../atoms/IconDelete/IconDelete'
import useDeleteProject from '@/hooks/useDeleteProject'
import { useState } from 'react'
import ModalDeleteProject from '../ModalDeleteProject/ModalDeleteProject'


export default function CardPortrait ({ _id, title, summary, mainPhoto, deleteIcon}: CardProps) {

    const { isLoading, isSuccess, deleteProject } = useDeleteProject()
    const [ isOpen, setIsOpen ] = useState<boolean>(false)

    const handleDelete = () => {
        setIsOpen(true)
        // deleteProject(id)
    }


    return (
        <div
        className={styles.cardWrapper}
        >
            {deleteIcon && 
            <div className={styles.cardWrapper__deleteWrapper} onClick={handleDelete}>
                <IconDelete/>
            </div>
            }
            {isOpen &&
            <ModalDeleteProject _id={_id} title={title} isOpen={isOpen} onClose={() => setIsOpen(false)}  />
            }
            <Link className={styles.cardWrapper__card} href={`/projectPage/${_id}`}>
                <div className={styles.cardWrapper__gradientLayer}></div>
                    <PhotoBasic photo={mainPhoto} sizes="(max-width: 684px) 100vw, (max-width: 1094px) 45vw, 30vw" />
            
                <div 
                    className={styles.cardWrapper__card__title}
                    >
                    <TitleCard text={title} />
                </div>
                <div className={styles.cardWrapper__card__line}></div>
                <div className={styles.cardWrapper__card__summary}>
                    <p className={styles.cardWrapper__card__summary__text}>{summary}...&nbsp;
                    <span className={styles.cardWrapper__card__summary__seeMore}>voir plus</span>
                    </p>
                </div>
            </Link>
        </div>
    )
}
