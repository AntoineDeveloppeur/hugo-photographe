import Project from '../models/project.js';
import uploadToS3, { parseForm } from '../middleware/upload.js';
// Interface pour la requête authentifié
// export interface AuthRequest extends Request {
//     auth?: {
//         userId: string
//     }
// }
// Exporter les fonctions individuellement
export async function createProject(req, res) {
    try {
        // Parse le formulaire avec formidable
        const { fields, files } = await parseForm(req);
        //Vérification du formulaire
        if (!fields.projectTexts) {
            return res.status(400).json({ message: 'Les données du projet sont requises' });
        }
        // Upload vers s3
        const photosUrlArray = await Promise.all(Object.entries(files)
            .map(async ([key, fileArray]) => {
            console.log('fileArray', fileArray);
            const url = await uploadToS3(fileArray, 'projets');
            if (url instanceof Error) {
                // return res.status(500).json({message: `erreur lors de l'upload des fichiers : ${url.message}`})
                throw new Error(`erreur lors de l'upload des fichiers : ${url.message}`);
            }
            return { [key]: url };
        }));
        const photosUrl = photosUrlArray
            .reduce((acc, file) => {
            return { ...acc, ...file };
        });
        //Corriger le type
        const projectData = typeof fields.projectTexts[0] === 'string'
            ? JSON.parse(fields.projectTexts[0])
            : fields.projectTexts;
        // Crée un nouveau projet
        const newProject = new Project({
            title: projectData.title,
            summary: projectData.summary,
            mainPhoto: {
                src: photosUrl['mainPhoto'],
                alt: projectData.alt,
                height: projectData.height || 800,
                width: projectData.width || 1200
            },
            textsAbovePhotos: projectData.textsAbovePhotos || [],
            photosSets: projectData.photosSets.map((set, setIndex) => {
                console.log('set', set);
                return set.map((photo, photoIndex) => {
                    console.log('photo', photo);
                    console.log('photosUrl[`set${setIndex}photo${photoIndex}`]', photosUrl[`set${setIndex + 1}photo${photoIndex + 1}`]);
                    return { ...photo, ...{ src: photosUrl[`set${setIndex + 1}photo${photoIndex + 1}`] } };
                });
            }),
            textsBelowPhotos: projectData.textsBelowPhotos || [],
        });
        // Sauvegarde le projet dans la base de donnée
        await newProject.save()
            .then(() => res.status(201).json({ message: 'Le projet a bien été créé' }))
            .catch((error) => res.status(400).json({ message: "Erreur lors de l'enregistrement du projet", error: error.message }));
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : String(error);
        res.status(500).json({ message: "Erreur lors de la création du projet pour envoi", error: errorMessage });
    }
}
export async function getProjects(req, res) {
    Project.find()
        .then((projects) => {
        return res.status(200).json({ projects });
    })
        .catch((error) => {
        res.status(404).json({ error });
    });
}
export async function deleteProject(req, res) {
    Project.findOne({ _id: req.body._id })
        .then(() => res.status(201).json({ message: 'id trouvé' })).
        catch((error) => res.status(404).json({ message: error }));
}
