import styles from './form-photos.module.scss'
import Input from '../../atoms/Input/Input'
import InputFile from '../InputFile/InputFile'

export default function FormPhoto(label, id register, fileInputRef) {
    return(
        <div className={styles.formPhoto}>
        <Input register={register} type='text' name='set1photo1alt' label='description succinte de la photo' defaultValue='test'/>
        <Input register={register} type='number' name='set1photo1height' label='hauteur en pixel' defaultValue={123} />
        <Input register={register} type='number' name='set1photo1width' label='largueur en pixel' defaultValue={123}  />
        <InputFile label={label} id={id}/>
        </div>
    )
}