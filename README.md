# 📸 Hugo Randez - Portfolio de Photographie

> Portfolio professionnel mettant en valeur le travail de Hugo Randez,
> photographe globe-trotter.

[photographe-hugo-randez.fr](https://photographe-hugo-randez.fr)

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![AWS S3](https://img.shields.io/badge/AWS_S3-569A31?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/s3/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

<br>

## 🎯 Présentation du projet

Ce projet a pour objectif de mettre en valeur le travail de Hugo Randez,
photographe globe-trotter, à travers un design simple et épuré.

<br>

## ✨ Fonctionnalités

Le photographe peut, en toute autonomie, gérer le contenu de son portfolio :

- 🔐 **Authentification sécurisée** : Utilisation de bcrypt pour le hachage des
  mots de passe et jsonWebToken pour la gestion des sessions
- 📝 **Gestion de projets** : Interface d'ajout de nouveaux projets avec
  React-hook-form et Zod pour la validation des données

<br>

## 🚀 Installation et démarrage

### Prérequis

- Node.js (version 16 ou supérieure)
- npm, yarn, pnpm ou bun

### Démarrage du projet

La partie frontend fonctionne avec des données en fallback :

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour
voir le résultat.

<br>

## 🛠️ Technologies utilisées

- **Frontend** : Next.js, Framer Motion
- **Backend** : Node.js, Express
- **Base de données** : MongoDB
- **Stockage** : AWS S3


## Deployer sans container

### En Local
- Merge les changements sur la branch **prod**
- Transpiler les fichier typescript du backend 
  ```
  cd backend | pnpm watch
  ```
- Run les test
  ```
  pnpm test
  ```
- Faire un test de build local
  ```
  Terminal 1
  cd backend | pnpm watch

  Terminal 2
  cd backend | pnpm dev

  Terminal 3
  pnpm run build
  ```
- modifier le fichier .env.local avec pour modèle .env.VPS.local
- commit puis push les changements sur origin prod

### Sur le VPS
- Si besoin arrêter les containers docker
  ```
  cd /var/www/hugo-photographe-docker
  docker-compose -f docker-compose.prod.yml stop backend
  docker-compose -f docker-compose.prod.yml stop frontend
  ```
- Lancer les serveurs node API
  ```
  pm2 list
  pm2 start <numéroDuBackend>
  ```

- Pull les fichiers
  ```
  cd /var/www/hugo-photographe/
  git branch
  git switch main
  git pull origin main
  npm run build
  ```
- Build le frontend
  ```

  cd /var/www/hugo-photographe/
  git pull origin main
  npm run build
  ```
- Lancer le serveur frontend Next
  ```
  pm2 list
  pm2 start <numéroDuFrontend>
  ```


## Deployer avec Docker

  ### En Local
  - Merge les changements sur la branch **prod**
  - Transpiler les fichiers typescript du backend 
    ```
    cd backend | pnpm watch
    ```
  - modifier le fichier .env.local avec pour modèle .env.VPS.local
  - Push dans le pipeline CI/CD
  ```
  git push CICD prod
  ```
  
  
  ### Sur le VPS
  - Si besoin arrêter les serveurs nodes
    ```
    pm2 list
    pm2 stop <numéroDuBackend>
    pm2 stop <numéroFrontend>
    ```
  - modifier le fichier .env.local avec pour modèle .env.VPS.docker
  - Push dans le pipeline CI/CD
  ```
  git push CICD main
  ```

## Gestion des branches

 - Les fonctionalités sont à développer à partir de **main**
 - La branche **prod** est mis à jour depuis **main** à chaque fois qu'une nouvelle version est déployée