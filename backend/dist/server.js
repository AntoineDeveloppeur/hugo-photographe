import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import projectRoutes from './routes/project.js';
import userRoutes from './routes/user.js';
import recaptchaRoute from './routes/recaptcha.js';
// Configuration des variables d'environnement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Remonter d'un niveau si on est dans le dossier dist
const rootDir = __dirname.includes('dist') ? path.join(__dirname, '..') : __dirname;
dotenv.config({ path: path.join(rootDir, '.env') });
// Crée l'application 
const app = express();
const PORT = parseInt(process.env.SERVER_PORT || '3002', 10);
// Middleware
app.use(express.json());
// Permet de traiter les formulaire, l'option extended à true autorise l'analyse d'objets complexes et imbriqués
app.use(express.urlencoded({ extended: true }));
// Base de donnée NoSQL
mongoose
    .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.fndalaw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.APPNAME}`)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
// Configuration CORS
const originCORS = process.env.NODE_ENV === 'production'
    ? process.env.DOMAIN_NAME
    : ['http://localhost:3000', 'http://localhost:3001'];
console.log(originCORS);
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
// Routes
app.use('/api/auth', userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/recaptcha', recaptchaRoute);
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
