'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
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

    const {register, 
        handleSubmit, 
        setError,
        formState: { errors, isSubmitting }} = useForm<FormFields>({
        resolver: zodResolver(userSchema), defaultValues : { email: 'test@gmail.com', password: 'jkmljklmjklmj'}
    })

    const onSubmit: SubmitHandler<FormFields> = async () => {
        try {
            const responseJSON : Response = await fetch('http://localhost:3002/auth/signIn', {
                headers: 'application/JSON',
                method: 'POST',
                body: {
                    email: 'inputTypeEmail',
                    password: 'inputTypePassword'
                }
            })
            const response: string = await JSON.parse(responseJSON)
            if(response.ok) {
                console.log('requête réussie')
                console.log('response.message',response.message)
            }

        } catch {
            setError('root', { message : 'error' })
            // Reste à configurer le backend pour qu'il me renvoi les erreurs
        }
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email")} type='email' placeholder='email' />
            <input {...register("password")} type='password' placeholder='mot de passe' />
            <button 
                disabled={isSubmitting ? true : false} 
                type='submit'
                >{isSubmitting ? 'chargement ...':'se connecter'}
            </button>
            {errors.root && <div>{errors.root.message}</div>}
        </form>


    )
    
}