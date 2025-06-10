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
import Paragraphes from '../../molecules/Paragraphes/Paragraphes'

export default function FormAjouterProjet() {
    
    const router = useRouter()
    //Il faudra créer le schéma en itérer sur la variable d'état
    const [projectSchema, setProjectSchema] = useState(z.object({
        title: z.string().min(1),
        summary: z.string().min(1),
        textAbovePhotos: z.string().min(0),
        mainPhotoAlt: z.string().min(2),

        // Note: Nous ne validons pas le fichier avec Zod car il sera géré séparément
    }))
    // État pour stocker les photos
    const [photoRefs, setPhotoRefs] = useState<Array<Array<React.RefObject<HTMLInputElement>>>>(
        [[createRef<HTMLInputElement>()]]
    )
    // État pour stocker les paragraphs
    const [paragraphArray, setParagraphArray] = useState<string[]>(
        ['']
    )
    
    interface FormFields {
        title: string;
        summary: string;
        textAbovePhotos: string;
        mainPhotoAlt: string;
        // Propriété dynamiques des sets de photos
        [key: `set${number}photo${number}alt`]: string;
        [key: `paragraph${number}`]: string;
    };
    
    // Modifie dynamiquement le validateur Zod
    useEffect(() => {
        // Initialise avec le schéma de base
        const basicSchema = z.object({
            title: z.string().min(1),
            summary: z.string().min(1),
            textAbovePhotos: z.string().min(0),
            mainPhotoAlt: z.string().min(2),
            // Note: Nous ne validons pas les fichier avec Zod car ils seront gérés séparément
        })

        //Ajoute les parties dynamiques
        const dynamicFields : Record<string, z.ZodTypeAny> = {}
        photoRefs.forEach((set,setIndex) => {
            set.forEach((_, photoIndex) => {
                dynamicFields[`set${setIndex+1}photo${photoIndex+1}alt`]= z.string().min(2)
            })
        })
        paragraphArray.forEach((_,index) =>
            dynamicFields[`paragraph${index+1}`]= z.string().min(2)
        )

        const dynamicFieldsSchema = z.object(dynamicFields)

        // @ts-expect-error merge fonctionne mais apporte des problème de typages qui ne sont pas véritable
        setProjectSchema(basicSchema.merge(dynamicFieldsSchema))
    }, [photoRefs, paragraphArray])

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

    // Gestionnaire pour l'ajout d'inputs
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
    const handleAddParagraph = () => {
        const tempParagraph = [...paragraphArray]
        setParagraphArray([...tempParagraph,''])
    }
    
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            // Vérifier la présences des fichiers
            if (!selectedFile) {
                throw new Error(`Veuillez sélectionner l'image principale`)

            }
            const formData = new FormData();

            // Prépare le paquet données textuelles du projets
            const projectData = {
                title: data.title,
                summary: data.summary,
                alt: data.mainPhotoAlt,
                textsAbovePhotos: paragraphArray.map((_,index) =>
                    data[`paragraph${index+1}`]
                ),
                photosSets: photoRefs.map((set, setIndex) => (
                    set.map((_, photoIndex) => (
                        {
                            alt :  data[`set${setIndex}photo${photoIndex}alt`],                        
                        }
                    ))
                ))
            }

            formData.append('projectTexts', JSON.stringify(projectData));
            formData.append('mainPhoto', selectedFile)

            //Ajoute les fichiers des sets de photos
            photoRefs.forEach((set, setIndex) => {
                set.forEach((photo, photoIndex) => {
                    if (!photo.current?.files?.[0]) {
                        throw new Error(`Veuillez sélectionner l'image pour le set n°${setIndex+1} photo n°${photoIndex+1}`)
                    }
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
            
            const response = await responseJSON.json()

            if(responseJSON.status === 403) {
                router.push('/connexion')
                throw new Error('Veuillez vous connecter pour ajouter un projet')
            }


            if(!responseJSON.ok) {
                throw new Error(response.error);
            }
            router.push('/succesAjoutProjet')
            

        }
        catch (error) {
            const errorMessage = error instanceof Error 
            ? error.message 
            : String(error)
            // alert(errorMessage)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* {partie statique du formulaire} */}
            <p className={styles.form__titre}>Vignette</p>

            <Input register={register} type='text' name='title' label='Titre du projet' error={errors.title?.message} defaultValue='test'/>
            <Textarea register={register} name='summary' label='Sommaire' error={errors.summary?.message} rows={6} defaultValue='test' />
            <p className={styles.form__titre}>Photo principale</p>
            <InputFile id='mainPhoto' fileInputRef={fileInputRef} handleFileChange={handleFileChange}/>
            <Input register={register} type='text' name='mainPhotoAlt' label='description succinte de la photo' error={errors.mainPhotoAlt?.message} defaultValue='test'/>
            <p className={styles.form__titre}>Page Projet</p>
            <p className={styles.form__sousTitre}>Texte à afficher en dessous de la photo principale</p>

            {/* {partie dynamique : les paragraphes} */}
            {paragraphArray.map((_,index) => 
                <Input name={`paragraph${index+1}`} key={`paragraph${index+1}`} register={register} type='text' label={`paragraphe n°${index+1}`} error={errors.textAbovePhotos?.message} defaultValue='test' />
            )}
            <div className={styles.form__buttonWrapper__addAParagraph} onClick={(e) => e.stopPropagation()}>
                <ButtonAdd text="Ajouter un paragraphe" onclick={() => {handleAddParagraph()}}/>
            </div>

            {/* {partie dynamique : les sets de photos} */}
            {photoRefs.map((set, setIndex) => (
                <div className={styles.form__set} key={`set${setIndex+1}`}>
                    <p className={styles.form__set__p}>Set n°{setIndex+1}</p>
                    {set.map((ref, photoIndex) => {
                        const dynamicAlt: string = `set${setIndex}photo${photoIndex}alt`
                            return <FormPhoto 
                            label={`Photo n°${photoIndex+1}`} 
                            id={`set${setIndex}photo${photoIndex}`} 
                            key={`set${setIndex}photo${photoIndex}`} 
                            fileInputRef={ref} 
                            //@ts-expect-error ddd
                            register={register}
                            // @ts-expected To check later
                            //@ts-expect-error ddd
                            errorAlt={errors[dynamicAlt]?.message}
                            />
                    })}
                    <div className={styles.form__buttonWrapper__addAPhoto} onClick={(e) => e.stopPropagation()}>
                        <ButtonAdd text="Ajouter une photo" onclick={() => {handleAddPhoto(setIndex)}}/>
                    </div>
                </div>
            ))}
            <div className={styles.form__buttonWrapper__addASet} onClick={(e) => e.stopPropagation()}>
                <ButtonAdd text="Ajouter un set" onclick={handleAddASet}/>
            </div>
            <div className={styles.form__buttonWrapper__saveProject}>
                <Button text={isSubmitting ? 'Chargement...' : 'Enregistrer le projet'} type='submit' disabled={isSubmitting}/>
            </div>
        </form>
    )
}