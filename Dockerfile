# Multi-stage build pour Next.js
FROM node:20-alpine

# Installer les dépendances nécessaires
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
# Installer les dépendances

RUN npm ci

COPY . .
# Variables d'environnement pour le build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
# Build de l'application Next.js
RUN npm run build

# Exposer le port
EXPOSE 3001

# Nécessaire à Next.js lorsqu'il démarre, il cherches ces variables
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

# Commande de démarrage
CMD ["npm", "start"]
