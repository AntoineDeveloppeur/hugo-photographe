import styles from './form-photos.module.scss'
import Input from '../../atoms/Input/Input'
import InputFile from '../InputFile/InputFile'
import {RefObject, ChangeEvent } from 'react'
import { UseFormRegister, FieldValues } from 'react-hook-form'

type FormPhotoTypes<T extends FieldValues = FieldValues> =  {
    label: string
    id: string
    register: UseFormRegister<T>
    fileInputRef: RefObject<HTMLInputElement>
    handleFileChange : (event: ChangeEvent<HTMLInputElement>) => void
    fileName: string
}

export default function FormPhoto<T extends FieldValues = FieldValues>({label, id, register, fileInputRef, handleFileChange, fileName} : FormPhotoTypes<T>) {
    return(
        <div className={styles.formPhoto}>
            <p className={styles.formPhoto__p}>{label}</p>
            <Input register={register} type='text' name={`${id}alt`} label='description succinte de la photo' defaultValue='test'/>
            <Input register={register} type='number' name={`${id}width`} label='largeur en pixel' defaultValue={123} />
            <Input register={register} type='number' name={`${id}height`} label='hauteur en pixel' defaultValue={123}  />
            <InputFile label={label} id={id} fileInputRef={fileInputRef} handleFileChange={handleFileChange} fileName={fileName}/>
        </div>
    )
}