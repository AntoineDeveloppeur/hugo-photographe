"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const mongoose_1 = __importDefault(require("mongoose"));
const project_js_1 = __importDefault(require("./routes/project.js"));
const user_js_1 = __importDefault(require("./routes/user.js"));
const recaptcha_js_1 = __importDefault(require("./routes/recaptcha.js"));
// Configuration des variables d'environnement
const __filename = (0, url_1.fileURLToPath)(import.meta.url);
const __dirname = path_1.default.dirname(__filename);
// Remonter d'un niveau si on est dans le dossier dist
const rootDir = __dirname.includes('dist') ? path_1.default.join(__dirname, '..') : __dirname;
dotenv_1.default.config({ path: path_1.default.join(rootDir, '.env') });
// Crée l'application 
const app = (0, express_1.default)();
const PORT = parseInt(process.env.SERVER_PORT || '3002', 10);
// Middleware
app.use(express_1.default.json());
// Permet de traiter les formulaire, l'option extended à true autorise l'analyse d'objets complexes et imbriqués
app.use(express_1.default.urlencoded({ extended: true }));
// Base de donnée NoSQL
mongoose_1.default
    .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.fndalaw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.APPNAME}`)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
// Configuration CORS
const originCORS = process.env.NODE_ENV === 'production'
    ? process.env.DOMAIN_NAME
    : ['http://localhost:3000', 'http://localhost:3001'];
app.use((0, cors_1.default)({
    origin: originCORS,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
// Routes
app.use('/api/auth', user_js_1.default);
app.use('/api/project', project_js_1.default);
app.use('/api/recaptcha', recaptcha_js_1.default);
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
