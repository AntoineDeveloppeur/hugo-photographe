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

export default function FormAjouterProjet() {
    
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
    
    // Comment créer/modifier FormFields Correctement ?
    // type FormFields = z.infer<typeof projectSchema>
    type FormFields = {
        title: string;
        summary: string;
        textAbovePhotos: string;
        mainPhotoAlt: string;
        mainPhotoHeight: number;
        mainPhotoWidth: number;
        // Ajouter un index signature pour les champs dynamiques
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
                alert('Veuillez sélectionner une image principale')
                return
            }
            photoRefs.forEach((set, setIndex) => {
                set.forEach((photo, photoIndex) => {
                    if (!photo.current?.files?.[0]) {
                        alert(`Veuillez sélectionner l'image pour le set n°${setIndex+1} photo n°${photoIndex+1}`)
                        return
                    }
                })
            })

            const formData = new FormData();

            // Créer l'objet à envoyé basique sans les sets
            const projectBaseData = {
                title: data.title,
                summary: data.summary,
                alt: data.mainPhotoAlt,
                height: data.mainPhotoHeight,
                width: data.mainPhotoWidth,
                textsAbovePhotos: data.textAbovePhotos
            };

            // Ajoute les propriétés des sets et photos supplémentaires
            const projectSetData = {}
            photoRefs.forEach((set, setIndex) => {
                set.forEach((_, photoIndex) => {
                    const dynamicKeyAlt = `set${setIndex+1}photo${photoIndex+1}alt`
                    const dynamicKeyWidth = `set${setIndex+1}photo${photoIndex+1}width`
                    const dynamicKeyHeight = `set${setIndex+1}photo${photoIndex+1}height`
                    Object.assign(projectSetData, {
                        [dynamicKeyAlt]: data[dynamicKeyAlt],
                        [dynamicKeyWidth]: data[dynamicKeyWidth],
                        [dynamicKeyHeight]: data[dynamicKeyHeight],
                    }

                    
                    )
                })
            })  
            const projectAllData = {...projectBaseData, ...projectSetData}
            // Ajout des inputs de type string et number au formulaire
            formData.append('projectTexts', JSON.stringify(projectAllData));


            const projectFiles = {
                'mainPhoto': selectedFile,
                ...photoRefs.flatMap((set, setIndex) =>
                    set.map((photo, photoIndex) => ({
                        [`set${setIndex+1}Photo${photoIndex+1}`]: photo.current?.files?.[0]
                    }))
                ).reduce((acc, file) => ({...acc, ...file}), {})
            }

            formData.append('projectFiles', JSON.stringify(projectFiles))
            
            console.log('formData',formData)
            
            
            const responseJSON = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/create`, {
                method: 'POST',
                body: formData
            });
            
            if(!responseJSON.ok) {
                console.log(await responseJSON.json())
                throw new Error(`Erreur HTTP ${responseJSON.status}: ${responseJSON.statusText}`);
            }
            
        }
        catch (error) {
            console.error(error);
            alert(`Malheureusement une erreur s'est produite. Contacter l'administrateur du site en lui communiquant cette erreur : ${error?.message ? error.message : error}`)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* {Crée la partie statique du formulaire} */}
            <Input register={register} type='text' name='title' label='Titre du projet' error={errors.title?.message} defaultValue='test'/>
            <Textarea register={register} name='summary' label='Sommaire' error={errors.summary?.message} rows={6} defaultValue='test' />
            <Input register={register} type='text' name='textAbovePhotos' label='Texte à afficher en dessous de la photo principale' error={errors.textAbovePhotos?.message} defaultValue='test' />
            <p className={styles.form__photoPrincipale}>Photo principale</p>
            <InputFile id='mainPhoto' fileInputRef={fileInputRef} handleFileChange={handleFileChange}/>
            <Input register={register} type='text' name='mainPhotoAlt' label='description succinte de la photo' error={errors.mainPhotoAlt?.message} defaultValue='test'/>
            <Input register={register} type='number' name='mainPhotoHeight' label='hauteur en pixel' error={errors.mainPhotoHeight?.message} defaultValue={123} />
            <Input register={register} type='number' name='mainPhotoWidth' label='largueur en pixel' error={errors.mainPhotoWidth?.message} defaultValue={123}  />
            
            

            {/* {Créé la partie dynamique : les sets de photos} */}
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