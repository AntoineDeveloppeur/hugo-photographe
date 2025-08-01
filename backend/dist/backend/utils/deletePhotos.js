"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOnePhotoFromDB = deleteOnePhotoFromDB;
exports.default = deletePhotos;
const getS3Client_1 = __importDefault(require("@/backend/utils/getS3Client"));
const client_s3_1 = require("@aws-sdk/client-s3");
async function deleteOnePhotoFromDB(url) {
    const s3Client = (0, getS3Client_1.default)();
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
        await s3Client.send(new client_s3_1.DeleteObjectCommand(deleteParams));
    }
    catch {
        return false;
    }
    return true;
}
async function deletePhotos(project, deleteOnePhotoFromDB) {
    // Mise en forme des url
    const urlTable = [
        project.mainPhoto.src,
        ...project.photosSets.flat().map((photo) => photo.src),
    ];
    const response = await Promise.all(urlTable.map(async (url) => await deleteOnePhotoFromDB(url)));
    return response.every((element) => element === true);
}
