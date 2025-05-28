import styles from './modal-delete-project.module.scss'
import { ModalProps, ModalDeleteProject } from '@/types'
import Modal from '../../atoms/Modal/Modal'
import { useState } from 'react'
import Paragraphes from '../Paragraphes/Paragraphes'
import Button from '../../atoms/Button/Button'
import ButtonSecondary from '../../atoms/ButtonSecondary/ButtonSecondary'


export default function ModalDeleteProject({_id, title, isOpen, onClose} : ModalDeleteProject) {

    const [ isConfirmed, setIsConfirmed ] = useState<boolean>(false)

    const handleYes = () => {}
    const handleNo = () => {}


    return(
        <Modal isOpen={isOpen} onClose={onClose}>
            {isConfirmed && <Paragraphes texts={[`Supprimer ${title} définitivement ?`]}/>}
            <Button text='Oui' onclick= {handleYes}/>
            <ButtonSecondary text='Non' onclick={handleNo}/>
        </Modal>
    )
}