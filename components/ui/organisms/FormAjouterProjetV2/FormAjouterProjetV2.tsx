'use client'

import styles from './form-ajouter-projet.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../../atoms/Input/Input'
import { promise, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '../../atoms/Button/Button'
import Textarea from '../../atoms/Textarea/Textarea'
import { useState, useEffect, useRef, createRef } from 'react'
import InputFile from '../../molecules/InputFile/InputFile'
import FormPhoto from '../../molecules/FormPhoto/FormPhoto'
import ButtonAdd from '../../atoms/ButtonAdd/ButtonAdd'
import PhotosSets from '../../molecules/PhotosSets/PhotosSets'
import { useRouter } from 'next/navigation'

export default function FormAjouterProjet() {
    
    const router = useRouter()
    //Il faudra créer le schéma en itérer sur la variable d'état
    const [projectSchema, setProjectSchema] = useState(z.object({
        title: z.string().min(1),
        summary: z.string().min(1),
        textAbovePhotos: z.string().min(0),
        mainPhotoAlt: z.string().min(2),
        mainPhotoHeight: z.coerce.number().min(3),
        mainPhotoWidth: z.coerce.number().min(3)
        // Note: Nous ne validons pas le fichier avec Zod car il sera géré séparément
    }))
    // État pour stocker les photos
    const [photoRefs, setPhotoRefs] = useState<Array<Array<React.RefObject<HTMLInputElement>>>>([[createRef<HTMLInputElement>()]]);
    
    interface FormFields {
        title: string;
        summary: string;
        textAbovePhotos: string;
        mainPhotoAlt: string;
        mainPhotoHeight: number;
        mainPhotoWidth: number;
        // Propriété dynamiques des sets de photos
        [key: `set${number}photo${number}alt`]: string;
        [key: `set${number}photo${number}width`]: number;
        [key: `set${number}photo${number}height`]: number;
    };
    
    // Modifie dynamiquement le validateur Zod
    useEffect(() => {
        const basicSchema = z.object({
            title: z.string().min(1),
            summary: z.string().min(1),
            textAbovePhotos: z.string().min(0),
            mainPhotoAlt: z.string().min(2),
            mainPhotoHeight: z.coerce.number().min(3),
            mainPhotoWidth: z.coerce.number().min(3)
            // Note: Nous ne validons pas les fichier avec Zod car ils seront gérés séparément
        })

        const dynamicFields : Record<string, z.ZodTypeAny> = {}

        photoRefs.forEach((set,setIndex) => {
            set.forEach((_, photoIndex) => {
                dynamicFields[`set${setIndex}photo${photoIndex}alt`]= z.string().min(2)
                dynamicFields[`set${setIndex}photo${photoIndex}width`]= z.coerce.number().min(3)
                dynamicFields[`set${setIndex}photo${photoIndex}height`]= z.coerce.number().min(3)
            })
        })

        const dynamicFieldsSchema = z.object(dynamicFields)

        setProjectSchema(basicSchema.merge(dynamicFieldsSchema))


        // setProjectSchema(z.object({
        //     ...basicSchema,
        //     ...dynamicFields
        // }))
    }, [photoRefs])

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>({
        resolver: zodResolver(projectSchema)
    })

    // Référence pour récupérerla photo principale
    const fileInputRef = useRef<HTMLInputElement>(null);
    // État pour stocker le fichier sélectionné
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Gestionnaire pour le changement de fichier de la photo principale
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
    };
    const handleAddASet = () => {
        setPhotoRefs([...photoRefs, [createRef<HTMLInputElement>()]]);
    }
    const handleAddPhoto = (setIndex: number) => {
        if(photoRefs[setIndex].length > 2) {
            return
        }
        // Créer une copie pour éviter de modifier directement l'état
        const newPhotoRefs = [...photoRefs]
        newPhotoRefs[setIndex].push(createRef<HTMLInputElement>())
        // Changer la façon dont sont ajouté les références
        setPhotoRefs(newPhotoRefs);
    }
    
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            // Vérifier la présences des fichiers
            if (!selectedFile) {
                throw new Error(`Veuillez sélectionner l'image principale`)

            }
            photoRefs.forEach((set, setIndex) => {
                set.forEach((photo, photoIndex) => {
                    if (!photo.current?.files?.[0]) {
                        throw new Error(`Veuillez sélectionner l'image pour le set n°${setIndex+1} photo n°${photoIndex+1}`)
                    }
                })
            })

            const formData = new FormData();

            // Prépare le paquet données textuelles du projets
            const projectData = {
                title: data.title,
                summary: data.summary,
                alt: data.mainPhotoAlt,
                height: data.mainPhotoHeight,
                width: data.mainPhotoWidth,
                textsAbovePhotos: data.textAbovePhotos,
                photosSets: photoRefs.map((set, setIndex) => (
                    set.map((_, photoIndex) => (
                        {
                            alt :  data[`set${setIndex}photo${photoIndex}alt`],
                            width :  data[`set${setIndex}photo${photoIndex}width`],
                            height :  data[`set${setIndex}photo${photoIndex}height`]                          
                        }
                    ))
                ))
            }

            console.log('projectData',projectData)
            formData.append('projectTexts', JSON.stringify(projectData));
            formData.append('mainPhoto', selectedFile)
            photoRefs.forEach((set, setIndex) => {
                set.forEach((photo, photoIndex) => {
                    formData.append(`set${setIndex+1}photo${photoIndex+1}`, photo.current?.files?.[0] )
                })
            })
            
            // Envoie du formulaire
            const responseJSON = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                },
                body: formData
            });
            
            if(responseJSON.status === 403 || '403') {
                
                router.push('/connexion')
                throw new Error('Veuillez vous connecter pour ajouter un projet')

            }

            if(!responseJSON.ok) {
                console.log(await responseJSON.json())
                throw new Error(`Erreur HTTP ${responseJSON.status}: ${responseJSON.statusText}`);
            }
            
            // redirection vers le succès d'ajout de projet
        }
        catch (error) {
            alert(error?.message ? error.message : error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* {partie statique du formulaire} */}
            <Input register={register} type='text' name='title' label='Titre du projet' error={errors.title?.message} defaultValue='test'/>
            <Textarea register={register} name='summary' label='Sommaire' error={errors.summary?.message} rows={6} defaultValue='test' />
            <Input register={register} type='text' name='textAbovePhotos' label='Texte à afficher en dessous de la photo principale' error={errors.textAbovePhotos?.message} defaultValue='test' />
            <p className={styles.form__photoPrincipale}>Photo principale</p>
            <InputFile id='mainPhoto' fileInputRef={fileInputRef} handleFileChange={handleFileChange}/>
            <Input register={register} type='text' name='mainPhotoAlt' label='description succinte de la photo' error={errors.mainPhotoAlt?.message} defaultValue='test'/>
            <Input register={register} type='number' name='mainPhotoHeight' label='hauteur en pixel' error={errors.mainPhotoHeight?.message} defaultValue={123} />
            <Input register={register} type='number' name='mainPhotoWidth' label='largueur en pixel' error={errors.mainPhotoWidth?.message} defaultValue={123}  />
            
            

            {/* {partie dynamique : les sets de photos} */}
            {photoRefs.map((set, setIndex) => (
                <div className={styles.form__set} key={`set${setIndex}`}>
                    <p className={styles.form__set__p}>Set n°{setIndex+1}</p>
                    {set.map((ref, photoIndex) => {
                        const dynamicAlt: string = `set${setIndex}photo${photoIndex}alt`
                        const dynamicWidth: string = `set${setIndex}photo${photoIndex}width`
                        const dynamicHeight: string = `set${setIndex}photo${photoIndex}height`

                        return <FormPhoto 
                            label={`Photo n°${photoIndex+1}`} 
                            id={`set${setIndex}photo${photoIndex}`} 
                            key={`set${setIndex}photo${photoIndex}`} 
                            fileInputRef={ref} 
                            register={register}
                            errorAlt={errors[dynamicAlt]?.message}
                            errorWidth={errors[dynamicWidth]?.message}
                            errorHeight={errors[dynamicHeight]?.message}
                            />
                    })}
                    <div className={styles.form__buttonWrapper__addAPhoto}>
                        <ButtonAdd text="Ajouter une photo" onclick={() => handleAddPhoto(setIndex)}/>
                    </div>
                </div>
            ))}
            <div className={styles.form__buttonWrapper__addASet}>
                <ButtonAdd text="Ajouter un set" onclick={handleAddASet}/>
            </div>
            <div className={styles.form__buttonWrapper__saveProject}>
                <Button text={isSubmitting ? 'Chargement...' : 'Enregistrer le projet'} type='submit' disabled={isSubmitting}/>
            </div>
        </form>
    )
}