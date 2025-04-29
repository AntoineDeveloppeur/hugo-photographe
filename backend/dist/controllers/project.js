import Project from '../models/project.js';
import uploadToS3, { parseForm } from '../middleware/upload.js';
// Exporter les fonctions individuellement
export default async function createProject(req, res) {
    try {
        // Parse le formulaire avec formidable
        const { fields, files } = await parseForm(req);
        if (!fields.project) {
            return res.status(400).json({ message: 'Les données du projet sont requises' });
        }
        const projectData = typeof fields.project[0] === 'string'
            ? JSON.parse(fields.project[0])
            : fields.project;
        // Double vérification avec le frontend à supprimer
        if (!files.mainPhoto) {
            return res.status(400).json({ message: 'Une image principale est requise' });
        }
        // Upload l'image sur S3 
        const mainPhotoUrl = await uploadToS3(files.mainPhoto[0], 'projets');
        if (mainPhotoUrl instanceof Error) {
            res.status(500).json({ error: `Erreur lors de l'upload sur s3: ${mainPhotoUrl.message}` });
        }
        // Gérer les projets avec plusieurs set
        // Crée un nouveau projet
        const newProject = new Project({
            title: projectData.title,
            summary: projectData.summary,
            mainPhoto: {
                src: mainPhotoUrl,
                alt: projectData.alt,
                height: projectData.height || 800,
                width: projectData.width || 1200
            },
            textsAbovePhotos: projectData.textsAbovePhotos || [],
            photosSets: projectData.photosSets,
            textsBelowPhotos: projectData.textsBelowPhotos || [],
        });
        // Sauvegarde le projet dans la base de donnée
        await newProject.save()
            .then(() => res.status(201).json({ message: 'Le projet a bien été créé' }))
            .catch((error) => res.status(400).json({ message: "Erreur lors de l'enregistrement du projet", error: error.message }));
    }
    catch (error) {
        res.status(500).json({ message: "Erreur lors de la création du projet pour envoi", error: error });
    }
}
