import getS3Client from "../utils/getS3Client.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
export async function deleteOnePhotoFromDB(url) {
    const s3Client = getS3Client();
    // Récupérer la clé de la photo à supprimer
    // récupérer le nom du bucket
    console.log("url dans deleteOnePhotoFRomDB", url);
    const urlWithoutProtocol = url.split("https://")[1];
    console.log("urlWithoutProtocol dans deleteOnePhotoFRomDB", urlWithoutProtocol);
    const bucketName = urlWithoutProtocol.split(".s3.")[0];
    console.log("bucketName dans deleteOnePhotoFRomDB", bucketName);
    const photoKey = url.split("amazonaws.com/")[1];
    const deleteParams = {
        Bucket: bucketName,
        Key: photoKey,
    };
    try {
        await s3Client.send(new DeleteObjectCommand(deleteParams));
        console.log("Après await s3Client.send(new DeleteObjectCommand(deleteParams");
    }
    catch (error) {
        console.log("Après await s3Client.send(new DeleteObjectCommand(deleteParams catch (error) {");
        return {
            success: false,
            error: `erreur lors de la suppression d'une photo dans la base de donnée: ${error}`,
        };
    }
    console.log("Après await s3Client.send(new DeleteObjectCommand avant   return { success: true, error: null }  ");
    return { success: true, error: null };
}
export default async function deletePhotos(project, deleteOnePhotoFromDB) {
    // Mise en forme des url
    const urlTable = [
        project.mainPhoto.src,
        ...project.photosSets.flat().map((photo) => photo.src),
    ];
    const response = await Promise.all(urlTable.map(async (url) => await deleteOnePhotoFromDB(url)));
    return response.every((element) => element.success === true);
}
