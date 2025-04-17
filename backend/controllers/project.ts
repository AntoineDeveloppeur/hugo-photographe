import { Request, Response } from 'express'
import Project from '../models/project.js'
import uploadToS3, { parseForm } from '../middleware/upload.js'

// Interface pour la requête authentifié
export interface AuthRequest extends Request {
    auth?: {
        userId: string
    }
}

// Exporter les fonctions individuellement
export default async function createProject(req: AuthRequest, res: Response) {
    console.log('début function createProject')
    try {
        // Parse le formulaire avec formidable
        console.log('début try')

        const {fields, files } = await parseForm(req)
        console.log('après parseForm')


        // Parse les données du projet
        console.log('fields dans le controller',fields)
        console.log('typeof fields.project(0)',typeof fields.project[0])
        console.log('JSON.parse(fields.project[0])',JSON.parse(fields.project[0]))

        const projectData = typeof fields.project[0] === 'string' 
            ? JSON.parse(fields.project[0])
            : fields.project

        // Vérifie si une image principale a été fournie
        // if (!files.mainPhoto) {
        //     return res.status(400).json({ message: 'Une image principale est requise'})
        // }

        // // Upload l'image sur S3 
        // const mainPhotoUrl = await uploadToS3(files.mainPhoto, 'projets')


        // Crée un nouveau projet
        const newProject = new Project({
            title: projectData.title,
            summary: projectData.summary,
            mainPhoto: {
                src: projectData.src,
                alt: projectData.alt,
                height: projectData.height || 800,
                width: projectData.width || 1200
            },
            textsAbovePhotos: projectData.textsAbovePhotos || []
        })

        // Sauvegarde le projet dans la base de donnée
        await newProject.save()
        .then(() => res.status(201).json({message : 'Le projet a bien été créé'}))
        .catch((error) => res.status(400).json({message: "Erreur lors de l'enregistrement du projet", error: error.message}))
    } 
    catch (error) {
        res.status(500).json({message: "Erreur lors de la création du projet pour envoi", error: error})
    }
}