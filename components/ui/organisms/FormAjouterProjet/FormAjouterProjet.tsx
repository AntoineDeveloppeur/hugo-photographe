'use client'

import styles from './form-ajouter-projet.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../../atoms/Input/Input'
import { promise, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '../../atoms/Button/Button'
import Textarea from '../../atoms/Textarea/Textarea'

export default function FormAjouterProjet() {

    const projectSchema = z.object({
        title: z.string().min(1),
        summary: z.string().min(1),
        textAbovePhotos: z.string().min(0),
        set1photo1alt: z.string().min(2),
        set1photo1height: z.coerce.number().min(3),
        set1photo1width: z.coerce.number().min(3)
    })

    type FormFields = z.infer<typeof projectSchema>

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>({
        resolver: zodResolver(projectSchema)
    })

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await new Promise<void>((resolve) => {
                setTimeout((resolve),2000)
            })
            console.log('Projet ajouté');
        }
        catch (error) {}

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Input register={register} type='text' name='title' label='Titre du projet' error={errors.title?.message} defaultValue='test'/>
            <Textarea register={register} name='summary' label='Sommaire' error={errors.summary?.message} rows={6} defaultValue='test' />
            <Input register={register} type='text' name='textAbovePhotos' label='Texte à afficher en dessous de la photo principale' error={errors.textAbovePhotos?.message} defaultValue='test' />
            <Input register={register} type='text' name='set1photo1alt' label='description succinte de la photo' error={errors.set1photo1alt?.message} defaultValue='test'/>
            <Input register={register} type='number' name='set1photo1height' label='hauteur en pixel' error={errors.set1photo1height?.message} defaultValue={123} />
            <Input register={register} type='number' name='set1photo1width' label='largueur en pixel' error={errors.set1photo1width?.message} defaultValue={123}  />
            <div className={styles.form__buttonWrapper}>
                <Button text={isSubmitting ? 'Chargement...' : 'Ajouter le projet'} type='submit' disabled={isSubmitting}/>
            </div>

        </form>
    )
}