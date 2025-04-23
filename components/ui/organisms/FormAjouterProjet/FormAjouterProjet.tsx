'use client'

import styles from './form-ajouter-projet.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../../atoms/Input/Input'
import { promise, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '../../atoms/Button/Button'
import Textarea from '../../atoms/Textarea/Textarea'
import { useState, useRef } from 'react'
import InputFile from '../../molecules/InputFile/InputFile'

export default function FormAjouterProjet() {
    // Référence pour le champ de fichier
    const fileInputRef = useRef<HTMLInputElement>(null);
    // État pour stocker le fichier sélectionné
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // État pour afficher le nom du fichier sélectionné
    const [fileName, setFileName] = useState<string>('');

    // Gestionnaire pour le changement de fichier
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setSelectedFile(file);
        setFileName(file ? file.name : '');
    };

    const projectSchema = z.object({
        title: z.string().min(1),
        summary: z.string().min(1),
        textAbovePhotos: z.string().min(0),
        set1photo1alt: z.string().min(2),
        set1photo1height: z.coerce.number().min(3),
        set1photo1width: z.coerce.number().min(3)
        // Note: Nous ne validons pas le fichier avec Zod car il sera géré séparément
    })

    type FormFields = z.infer<typeof projectSchema>

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>({
        resolver: zodResolver(projectSchema)
    })

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            if (!selectedFile) {
                alert('Veuillez sélectionner une image principale');
                return;
            }

            const formData = new FormData();
            
            // Ajouter le fichier à FormData
            formData.append('mainPhoto', selectedFile);
            
            // Créer l'objet projectData
            const projectData = {
                title: data.title,
                summary: data.summary,
                src: 'http://dfdq.com', // Cette valeur sera remplacée par l'URL de l'image uploadée
                alt: data.set1photo1alt,
                height: data.set1photo1height,
                width: data.set1photo1width,
                textsAbovePhotos: data.textAbovePhotos
            };
            
            formData.append('project', JSON.stringify(projectData));
            
            console.log('Envoi du formulaire avec image...');
            
            const responseJSON = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/create`, {
                method: 'POST',
                body: formData
            });
            
            if(!responseJSON.ok) {
                throw new Error(`Erreur HTTP ${responseJSON.status}: ${responseJSON.statusText}`);
            }
            
            console.log('Projet ajouté avec succès');
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Input register={register} type='text' name='title' label='Titre du projet' error={errors.title?.message} defaultValue='test'/>
            <Textarea register={register} name='summary' label='Sommaire' error={errors.summary?.message} rows={6} defaultValue='test' />
            <Input register={register} type='text' name='textAbovePhotos' label='Texte à afficher en dessous de la photo principale' error={errors.textAbovePhotos?.message} defaultValue='test' />
            <Input register={register} type='text' name='set1photo1alt' label='description succinte de la photo' error={errors.set1photo1alt?.message} defaultValue='test'/>
            <Input register={register} type='number' name='set1photo1height' label='hauteur en pixel' error={errors.set1photo1height?.message} defaultValue={123} />
            <Input register={register} type='number' name='set1photo1width' label='largueur en pixel' error={errors.set1photo1width?.message} defaultValue={123}  />
            
            <InputFile label='mainPhoto' id='mainPhoto' fileInputRef={fileInputRef} handleFileChange={handleFileChange} fileName={fileName} />
            {/* Champ pour télécharger une photo */}
            {/* <div className={styles.inputWrapper}>
                <label htmlFor="mainPhoto" className={styles.inputWrapper__label}>Photo principale</label>
                <div className={styles.fileInputContainer}>
                    <input
                        type="file"
                        id="mainPhoto"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className={styles.fileInput}
                    />
                    <div className={styles.fileInputInfo}>
                        {fileName ? (
                            <span>{fileName}</span>
                        ) : (
                            <span>Aucun fichier sélectionné</span>
                        )}
                    </div>
                </div>
            </div> */}
  </div>
hargement...' : 'Ajouter le projet'} type='submit' disabled={isSubmitting}/>
            </div>
        </form>
    )
}