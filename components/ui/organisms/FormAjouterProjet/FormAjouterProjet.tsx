import { useForm } from 'react-hook-form'
import Input from '../../atoms/Input/Input'
import { z } from 'zod'

export default function FormAjouterProjet() {

    const projectSchema = z.object({
        title: z.string().min(1),
        summary: z.string().min(1),
        textAbovePhotos: z.string().min(0),
        set1photo1alt: z.string().min(2),
        set1photo1height: z.number().min(3),
        set1photo1width: z.number().min(3)
    })

    type FormFields = z.infer<typeof projectSchema>

    const { register } = useForm<FormFields>()

    const handleSubmit = async (data) => {

    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input register={register} type='text' name='title' label='Titre du projet'  />
            
        </form>
    )
}