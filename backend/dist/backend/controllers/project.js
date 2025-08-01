"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = createProject;
exports.getProjects = getProjects;
exports.deleteProject = deleteProject;
const project_1 = __importDefault(require("@/backend/models/project"));
const upload_js_1 = __importStar(require("../middleware/upload.js"));
const deletePhotos_1 = __importStar(require("@/backend/utils/deletePhotos"));
// Exporter les fonctions individuellement
async function createProject(req, res) {
    try {
        // Parse le formulaire avec formidable
        const { fields, files } = await (0, upload_js_1.parseForm)(req);
        console.log("fields", fields);
        //Vérification du formulaire
        if (!fields.projectTexts) {
            return res
                .status(400)
                .json({ message: "Les données du projet sont requises" });
        }
        // Upload vers s3
        const photosUrlArray = await Promise.all(Object.entries(files).map(async ([key, fileArray]) => {
            const url = await (0, upload_js_1.default)(fileArray, "projets");
            if (url instanceof Error) {
                // return res.status(500).json({message: `erreur lors de l'upload des fichiers : ${url.message}`})
                throw new Error(`erreur lors de l'upload des fichiers : ${url.message}`);
            }
            return { [key]: url };
        }));
        const photosUrl = photosUrlArray.reduce((acc, file) => {
            return { ...acc, ...file };
        });
        //Corriger le type
        const projectData = typeof fields.projectTexts[0] === "string"
            ? JSON.parse(fields.projectTexts[0])
            : fields.projectTexts;
        // Crée un nouveau projet
        const newProject = new project_1.default({
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
        // Sauvegarde le projet dans la base de donnée
        await newProject
            .save()
            .then(() => res.status(201).json({ message: "Le projet a bien été créé" }))
            .catch((error) => res.status(400).json({
            message: "Erreur lors de l'enregistrement du projet",
            error: error.message,
        }));
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({
            message: "Erreur lors de la création du projet pour envoi",
            error: errorMessage,
        });
    }
}
async function getProjects(req, res) {
    project_1.default.find()
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
async function deleteProject(req, res) {
    project_1.default.findOne({ _id: req.params.id })
        .then((project) => {
        if (!project) {
            return res.status(404).json({ message: "Projet non trouvé" });
        }
        project_1.default.deleteOne({ _id: req.params.id })
            .then(() => {
            const projectObject = project.toObject();
            const projectWithStringId = {
                ...projectObject,
                _id: projectObject._id?.toString() || "",
            };
            // L'utilisateur n'a pas d'intérêt à savoir si les photos ont été supprimé
            // Ajouter un moyen de logger cette erreur.
            if (!(0, deletePhotos_1.default)(projectWithStringId, deletePhotos_1.deleteOnePhotoFromDB)) {
                console.error("les photos n'ont pas été supprimé");
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
