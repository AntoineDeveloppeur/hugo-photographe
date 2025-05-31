
export default function imageURL(width: number,quality: number,src : string) {

    const srcCorrected = src.slice(1)
    const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/_next/image?url=%2F${srcCorrected}&w=${width}&q=${quality}`
    console.log('URL', URL)
    // Il faut enlever le premier '/' de la source
    return URL

}

