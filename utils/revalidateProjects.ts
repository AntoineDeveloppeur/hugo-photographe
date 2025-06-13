'use server'

import { revalidatePath } from 'next/cache'

export default function revalidateProjects() {
  revalidatePath(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/getProjects`
  )
}
