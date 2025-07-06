import getS3Client from "./getS3Client.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
async function deleteOnePhoto(url) {
    const s3Client = getS3Client();
    // récupérer le nom du bucket
    const urlWithoutProtocol = url.split("https://")[1];
    const bucketName = urlWithoutProtocol.split(".s3.")[0];
    const photoKey = url.split("amazonaws.com/")[1];
    const deleteParams = {
        Bucket: bucketName,
        Key: photoKey,
    };
    console.log("deleteParams", deleteParams);
    try {
        await s3Client.send(new DeleteObjectCommand(deleteParams));
    }
    catch {
        return false;
    }
    return true;
}
export default async function deletePhotosFromDB(project) {
    const urlToDelete = [
        project.mainPhoto.src,
        ...project.photosSets.flat().map((photo) => photo.src),
    ];
    console.log("urlToDelete", urlToDelete);
    const results = await Promise.all(urlToDelete.map(async (url) => await deleteOnePhoto(url)));
    return results.every((result) => result === true);
    // qu'est-ce qu'il se passe si une des suppressions échoue ?
    //  est-ce que la fonction continue à être appelé pour les autres url ?
}
