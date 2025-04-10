import Project from '../models/project.js';
import uploadToS3, { parseForm } from '../middleware/upload.js';
// Exporter les fonctions individuellement
export default async function createProject(req, res) {
    try {
        // Parse le formulaire avec formidable
        const { fields, files } = await parseForm(req);
        // Parse les données du projet
        const projectData = typeof fields.project === 'string'
            ? JSON.parse(fields.project)
            : fields.project;
        // Vérifie si une image principale a été fournie
        if (!files.mainPhoto) {
            return res.status(400).json({ message: 'Une image principale est requise' });
        }
        // Upload l'image sur S3 
        const mainPhotoUrl = await uploadToS3(files.mainPhoto, 'projets');
        // Crée un nouveau projet
        const newProject = new Project({
            title: projectData.title,
            summary: projectData.summary,
            mainPhoto: {
                src: mainPhotoUrl,
                alt: projectData.alt,
                width: projectData.mainPhotoWidth || 1200,
                height: projectData.mainPhotoHeight || 800
            },
            textsAbovePhotos: projectData.textsAbovePhotos || []
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
