# Multi-stage build pour Next.js
FROM node:20-alpine AS base

# Installer les dépendances nécessaires
RUN apk add --no-cache libc6-compat

# Installer les dépendances
COPY . .
RUN npm ci

# Variables d'environnement pour le build
ENV NEXT_TELEMETRY_DISABLED 1

# Build de l'application Next.js
RUN npm run build

ENV NODE_ENV production

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs


USER nextjs

# Exposer le port
EXPOSE 3001

# Nécessaire à Next.js lorsqu'il démarre, il cherches ces variables
ENV PORT 3001
ENV HOSTNAME "0.0.0.0"

# Commande de démarrage
CMD ["node", "server.js"]
