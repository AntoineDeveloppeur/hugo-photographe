import getS3Client from "./getS3Client.js";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
async function deleteOnePhoto(url) {
    const s3Client = getS3Client();
    // Récupérer la clé de la photo à supprimer
    // récupérer le nom du bucket
    const urlWithoutProtocol = url.split("https://")[1];
    const bucketName = urlWithoutProtocol.split(".s3.")[0];
    const photoKey = url.split("amazonaws.com/")[1];
    const deleteParams = {
        Bucket: bucketName,
        Key: photoKey,
    };
    try {
        await s3Client.send(new DeleteObjectCommand(deleteParams));
    }
    catch {
        return false;
    }
    // Gueule de l'url
    //https://photos-hugo.s3.eu-west-3.amazonaws.com/projets/1749562350115-taïwan6.webp
    // Il faut Vérifier
    return true;
}
export default async function deletePhotosFromDB(project) {
    const urlTable = [
        project.mainPhoto.src,
        ...project.photosSets.flat().map((photo) => photo.src),
    ];
    const response = await Promise.all(urlTable.map(async (url) => await deleteOnePhoto(url)));
    return response.every((element) => element === true);
}
