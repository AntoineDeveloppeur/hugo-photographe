# Gestion des fichiers env

## Frontend
Il y a sur mon PC 4 fichiers environnements différents. Il servent tous des environnements différents.

- .env.PC.local -> pour le mode dev et build sur mon ordinateur
- .env.PCDocker.local -> faire tourner les containers sur mon ordinateur
- .env.VPS.local -> pour le serveur VPS sans docker
- .env.VPSDocker;local -> faire tourner les containers sur mon serveur VPS

Il faut copier coller le fichier dans l'environnement désiré et le **renommer .env.local**

## Backend
Il y a sur mon PC 2 fichiers environnements différents.

- .env.dev -> pour pour le mode dev sur mon ordinateur
- .env.prod -> pour tout le reste

Pareil, il faut copier coller le fichier dans l'environnement désiré et le **renommer .env**