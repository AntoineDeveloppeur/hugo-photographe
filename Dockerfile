# ==========================================
# STAGE 1: Installation des dépendances
# ==========================================
FROM node:20-alpine AS deps
WORKDIR /app

# Installer les dépendances système nécessaires
RUN apk add --no-cache libc6-compat

# Copier uniquement les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances (prod + dev, nécessaires pour le build)
RUN npm ci

# ==========================================
# STAGE 2: Build de l'application
# ==========================================
FROM node:20-alpine AS builder
WORKDIR /app

# Variables d'environnement pour le build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lejp9MqAAAAAMtrvI6ixsE2OXFmaNucIa6okLov
ENV API_URL_FROM_SERVER=http://backend:3002

# Container sur mon ordinateur
ENV NEXT_PUBLIC_BASE_URL=http://localhost:3001
ENV NEXT_PUBLIC_SERVER_URL=http://localhost:3002

# Container sur le VPS
# ENV NEXT_PUBLIC_BASE_URL=https://photographe-hugo-randez.fr
# ENV NEXT_PUBLIC_SERVER_URL=https://photographe-hugo-randez.fr

# Copier les node_modules depuis le stage deps
COPY --from=deps /app/node_modules ./node_modules

# Copier tout le code source
COPY . .

# Lancer le build Next.js (génère .next/standalone, .next/static, etc.)
RUN npm run build

# ==========================================
# STAGE 3: Image finale de production (RUNNER)
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

# Variables d'environnement de production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

# Créer un utilisateur non-root pour la sécurité
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copier le dossier public (assets statiques)
COPY --from=builder /app/public ./public

# Copier le dossier standalone (serveur Node.js minimal)
# Attention : copier le CONTENU de standalone vers /app
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copier le dossier static (JS, CSS compilés)
# Attention : doit aller dans .next/static pour que Next.js le trouve
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Changer vers l'utilisateur non-root
USER nextjs

# Exposer le port
EXPOSE 3001

# Commande de démarrage : server.js est maintenant à la racine de /app
CMD ["node", "server.js"]