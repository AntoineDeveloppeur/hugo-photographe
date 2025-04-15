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
        resolver: zodResolver(userSchema), defaultValues : { email: 'test@gmail.com', password: '45678910'}
    })

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            const responseJSON : Response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signIn`, {
                headers: { 'Content-Type':
                    'application/JSON'
                },
                method: 'POST',
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                })
            })
            if(!responseJSON.ok) {
                throw new Error(`Erreur HTTP: ${responseJSON.status}`)
            }
            const response: string = await responseJSON.json()
            if(response.error) {
                throw new Error(response.error)
            }
            if(response.token) {
                window.localStorage.setItem('token', response.token)
                console.log('token récupéré')
                //redirection
            } else {
                throw new Error('Token manquant dans la réponse')
            }

        } catch (error) {
            setError('root', { message : error instanceof Error ? error.message : 'Une erreur est survenue' })
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