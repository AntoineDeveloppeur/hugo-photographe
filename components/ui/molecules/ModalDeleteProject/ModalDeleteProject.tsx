import styles from './modal-delete-project.module.scss'
import { ModalProps, ModalDeleteProjectProps } from '@/types'
import Modal from '../../atoms/Modal/Modal'
import { useState } from 'react'
import Paragraphes from '../Paragraphes/Paragraphes'
import Button from '../../atoms/Button/Button'
import ButtonSecondary from '../../atoms/ButtonSecondary/ButtonSecondary'
import useDeleteProject from '@/hooks/useDeleteProject'
import Loader from '../../atoms/Loader/Loader'


export default function ModalDeleteProject({_id, title, isOpen, onClose} : ModalDeleteProjectProps) {

    const [ isConfirmed, setIsConfirmed ] = useState<boolean>(false)
    const { isLoading, isSuccess, deleteProject } = useDeleteProject()

    const handleYes = () => {
        setIsConfirmed(false)
        deleteProject(_id)
        
    }
    const handleNo = () => {
        onClose()
    }


    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            {!isConfirmed && 
            <div className={styles.buttonsWrapper} onClick={(e) => e.stopPropagation()}>
            <Paragraphes texts={[`Supprimer ${title} définitivement ?`]}/>
            <Button text='Oui' onclick={handleYes}/>
            <ButtonSecondary text='Non' onclick={handleNo}/>
            </div>
            }
            {isLoading && <Loader/>}
            {isSuccess && <Paragraphes texts={['Suppression confirmé']}/>}
        </Modal>
    )
}