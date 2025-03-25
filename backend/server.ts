import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuration des variables d'environnement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

// Crée l'application 
const app = express();

const PORT: number = parseInt(process.env.SERVER_PORT || '3002',10);

// Middleware
app.use(express.json());
    // Permet de traiter les formulaire, l'option extended à true autorise l'analyse d'objets complexes et imbriqués
app.use(express.urlencoded({ extended: true }));

// Configuration CORS
app.use(cors({
  origin: 'http://localhost:3000', // Remplacer par l'URL de votre frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API de Hugo Photographe fonctionne correctement' });
});

// Créer un utilisateur
app.post('/auth',(req, res) => {
  console.log('req.body.user',req.body.user)
  console.log('req.body.password',req.body.password)
  res.status(200).json({message: "creditentals received"})
})


// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});