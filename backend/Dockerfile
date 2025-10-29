# Image de base
FROM node:20-alpine

# Installer les dépendances nécessaires pour la compilation native
RUN apk add --no-cache libc6-compat python3 make g++

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs
RUN adduser -S hugo -u 1001

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Supprimer complètement node_modules s'il existe et installer proprement
RUN npm ci && \
    npm rebuild bcrypt --build-from-source && \
    npm cache clean --force

# Copier le code source (en excluant node_modules local)
COPY . .

# Changer le propriétaire des fichiers
RUN chown -R hugo:nodejs /app
USER hugo

# Compiler TypeScript
RUN npm run build

# Exposer le port 3002
EXPOSE 3002

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3002/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Commande de démarrage
CMD ["npm", "start"]
