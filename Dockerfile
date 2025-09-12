# Multi-stage build pour Next.js
FROM node:20-alpine AS base

# Installer les dépendances nécessaires
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Installer les dépendances
FROM base AS deps
COPY package*.json ./
RUN npm ci

# Build de l'application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Variables d'environnement pour le build
ENV NEXT_TELEMETRY_DISABLED 1

# Build de l'application Next.js
RUN npm run build

# Stage de production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Créer un utilisateur non-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier les fichiers nécessaires depuis le builder
COPY --from=builder /app/public ./public

# Copier les fichiers de build Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Exposer le port
EXPOSE 3001

# Nécessaire à Next.js lorsqu'il démarre, il cherches ces variables
ENV PORT 3001
ENV HOSTNAME "0.0.0.0"

# Commande de démarrage
CMD ["node", "server.js"]
