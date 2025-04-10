import { useForm } from 'react-hook-form'
import { z } from 'zod'

export default function FormConnexion() {

    const userSchema = z
    .object({
        email: z.string().email(),
        password: z
        .string()
        .min(5)
        .max(20)
    })

    type FormFields = z.infer<typeof userSchema>

    const {register, handleSubmit} = useForm<FormFields>()

    const onSubmit = () => {
        console.log('form submitted')
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email")} type='email' placeholder='email' />
            <input {...register("password")} type='password' placeholder='mot de passe' />
            <button type='submit'>se connecter</button>
        </form>


    )
    
}