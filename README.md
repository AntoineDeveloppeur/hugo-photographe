## Objectif du projet

Ce projet a pour but de mettre en valeur le travail de Hugo Randez, Photographe
globe trotter. Il s'agit de mettre en avant son travail à travers un design
simple et épuré.

photographe-hugo-randez.fr

Ajouter des badges: Languages FrameWorks Next.js, Node, MongoDB, AWS S3
Librairie les plus importantes : Express, Motion pour les animations

## Fonctionnalités Client

Le photographe peut, en toute autonomie, ajouter des projets à la partie blog.
Ce projet sont constitué de photos et de texte portant sur un voyage, un thème
particulier. Pour servir cette fonctionnalité le projet comporte :

- Une page d'authentification : librairie bcrypt pour crypter les mots de passe
- Une page d'ajout de projet : librairie React-hook-form et zod pour la
  validation des données

This is a [Next.js](https://nextjs.org) project bootstrapped with
[`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Faire fonctionner le projet sur votre machine

La partie frontend va fonctionner sur votre machine avec des data en fallback

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.
