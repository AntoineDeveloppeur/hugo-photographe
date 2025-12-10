import Project from "../models/project.js";
import uploadPhoto from "../utils/uploadPhoto.js";
import parseForm from "../utils/parseForm.js";
import deletePhotos, { deleteOnePhotoFromDB, } from "../utils/deletePhotos.js";
import formatError from "../utils/formatError.js";
// Exporter les fonctions individuellement
export async function createProject(req, res) {
    try {
        console.log("début createProject");
        // Parse le formulaire avec formidable
        const { fields, files } = await parseForm(req);
        //Vérification du formulaire
        if (!fields.projectTexts) {
            console.log("Les données du projet sont incomplètes");
            return res
                .status(400)
                .json({ message: "Les données du projet sont incomplètes" });
        }
        // Upload vers s3
        const photosUrlArray = await Promise.all(Object.entries(files).map(async ([key, fileArray]) => {
            const url = await uploadPhoto(fileArray);
            if (url instanceof Error) {
                console.log(`erreur lors de l'upload des fichiers : ${url.message}`);
                throw new Error(`erreur lors de l'upload des fichiers : ${url.message}`);
            }
            return { [key]: url };
        }));
        const photosUrl = photosUrlArray.reduce((acc, file) => {
            return { ...acc, ...file };
        });
        //Corriger le type, en faire une fonction
        const projectData = typeof fields.projectTexts[0] === "string"
            ? JSON.parse(fields.projectTexts[0])
            : fields.projectTexts;
        // Crée un nouveau projet
        const newProject = new Project({
            title: projectData.title,
            summary: projectData.summary,
            mainPhoto: {
                src: photosUrl["mainPhoto"],
                alt: projectData.alt,
                height: files.mainPhoto.height || 800,
                width: files.mainPhoto.width || 1200,
            },
            textsAbovePhotos: projectData.textsAbovePhotos || [],
            photosSets: projectData.photosSets.map((set, setIndex) => {
                return set.map((photo, photoIndex) => {
                    return {
                        ...photo,
                        ...{ src: photosUrl[`set${setIndex + 1}photo${photoIndex + 1}`] },
                        // Informations liés à la taille directement pris dans les informations du fichier
                        width: files[`set${setIndex + 1}photo${photoIndex + 1}`].width,
                        height: files[`set${setIndex + 1}photo${photoIndex + 1}`].height,
                    };
                });
            }),
            textsBelowPhotos: projectData.textsBelowPhotos || [],
        });
        console.log("variable newProject définie");
        // Sauvegarde le projet dans la base de donnée
        await newProject
            .save()
            .then(() => {
            console.log(`après then de newProject`);
            res.status(201).json({ message: "Le projet a bien été créé" });
        })
            .catch((error) => {
            console.log(`après catch final de createProject`);
            res.status(400).json({
                message: "Erreur lors de l'enregistrement du projet",
                error: error.message,
            });
        });
    }
    catch (error) {
        const errorMessage = formatError(error);
        console.log(`après catch de newProject`);
        res.status(500).json({
            message: "Erreur lors de la création du projet pour envoi",
            error: errorMessage,
        });
    }
}
export async function getProjects(req, res) {
    Project.find()
        .then((projects) => {
        // Convertir les _id en chaînes de caractères
        const projectsWithStringIds = projects.map((project) => {
            const projectObj = project.toObject();
            return {
                ...projectObj,
                _id: projectObj._id?.toString() || "",
            };
        });
        return res.status(200).json({ projects: projectsWithStringIds });
    })
        .catch((error) => {
        res.status(404).json({ error });
    });
}
export async function deleteProject(req, res) {
    Project.findOne({ _id: req.params.id })
        .then((project) => {
        if (!project) {
            return res.status(404).json({ message: "Projet non trouvé" });
        }
        Project.deleteOne({ _id: req.params.id })
            .then(() => {
            const projectObject = project.toObject();
            const projectWithStringId = {
                ...projectObject,
                _id: projectObject._id?.toString() || "",
            };
            // L'utilisateur n'a pas d'intérêt à savoir si les photos ont été supprimé
            // Ajouter un moyen de logger cette erreur.
            if (!deletePhotos(projectWithStringId, deleteOnePhotoFromDB)) {
            }
            res
                .status(200)
                .json({ message: "Projet supprimé avec succès", project });
        })
            .catch((error) => {
            res.status(400).json({ error });
        });
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
}
