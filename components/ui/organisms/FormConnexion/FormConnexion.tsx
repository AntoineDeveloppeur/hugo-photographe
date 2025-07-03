"use client"

import styles from "./form-connexion.module.scss"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import Button from "@/components/ui/atoms/Button/Button"
import Input from "@/components/ui/atoms/Input/Input"
import { useRouter } from "next/navigation"

export default function FormConnexion() {
  const router = useRouter()

  const userSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(20),
  })

  type FormFields = z.infer<typeof userSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(userSchema),
    defaultValues: { email: "test@gmail.com", password: "45678910" },
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const responseJSON: Response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signIn`,
        {
          headers: { "Content-Type": "application/JSON" },
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        }
      )
      if (!responseJSON.ok) {
        throw new Error(
          `Erreur ${responseJSON.status}: ${responseJSON.statusText}`
        )
      }
      const response = await responseJSON.json()
      if (response.error) {
        throw new Error(response.error)
      }
      if (response.token) {
        window.localStorage.setItem("token", response.token)
        router.push("/administrateur")
      } else {
        throw new Error("Token manquant dans la réponse")
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      alert(errorMessage)
      // setError('root', { message : error instanceof Error ? error.message : 'Une erreur est survenue' })
      // Reste à configurer le backend pour qu'il me renvoi les erreurs
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <Input
        register={register}
        type="email"
        label="Email"
        error={errors.email?.message}
        name="email"
      />
      <Input
        register={register}
        type="password"
        label="Mot de passe"
        error={errors.password?.message}
        name="password"
      />
      <div className={styles.form__buttonWrapper}>
        <Button
          text={isSubmitting ? "chargement ..." : "se connecter"}
          disabled={isSubmitting ? true : false}
          type="submit"
        ></Button>
      </div>
      {errors.root && <div>{errors.root.message}</div>}
    </form>
  )
}
