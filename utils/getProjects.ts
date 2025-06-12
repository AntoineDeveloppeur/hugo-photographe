import dataFallBack from '@/data/data.json'
import { Data } from '@/types'

export default async function getProjects(): Promise<Data> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/getProjects`,
      { next: { revalidate: 20 } }
    )

    if (!response.ok) {
      console.log('if(!response.ok de getData')
      return dataFallBack
    }
    const data: Data = await response.json()
    return data
  } catch (error) {
    console.log('if(catch de getData', error)

    return dataFallBack
  }
}
