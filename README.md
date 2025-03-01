# Task Manager - Application de Gestion de Tâches

## Description

**Task Manager** est une application web permettant de gérer des tâches de manière simple et efficace. Elle permet aux utilisateurs de créer, lire, mettre à jour et supprimer des tâches. De plus, elle dispose d'une fonctionnalité d'authentification pour permettre aux utilisateurs de gérer leurs tâches de manière sécurisée. Ce projet utilise **React** pour le frontend et **Node.js** avec **MySQL** pour le backend.

### Fonctionnalités principales :
- Inscription et connexion d'utilisateur
- Gestion des tâches : ajout, modification, suppression et consultation
- Filtrage et recherche des tâches
- Interface responsive

## Technologies utilisées
- **Frontend** : React, Vite, Tailwind CSS, React Hook Form, React Router
- **Backend** : Laravel
- **Base de données** : PostgreSQL
- **Autres** : Axios, NProgress, Yup (validation de formulaires)

## Version
- **Version** : 1.0.0
- **Date de création** : Février 2025
- **Dernière mise à jour** : Février 2025

---

## Prérequis

Avant de commencer, assure-toi d'avoir installé les éléments suivants :

- **Node.js** et **npm** (ou **yarn**) : [Télécharger Node.js](https://nodejs.org/)
- **PostgreSQL** : [Télécharger PostgreSQL](https://www.postgresql.org/download/)
- **Vite** : Pour la gestion du frontend (installé automatiquement avec npm).

---

## Installation

### 1. Cloner le projet

Commence par cloner ce projet sur ton environnement local :


git clone https://github.com/ton-utilisateur/task-manager.git
cd task-manager


### 2. Installer les dépendances frontend

Dans le répertoire frontend, installe les dépendances :
npm install
npm run dev pour lancer le serveur de devellopement

### 2. Installer les dépendances backend

Dans le répertoire backend, installe les dépendances :
composer install

Duplique le fichier .env.example et renomme-le en .env
Modifie les informations de connexion à la base de données dans le fichier .env :

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=nom_de_ta_base
DB_USERNAME=ton_utilisateur
DB_PASSWORD=ton_mot_de_passe


Pour générer une clé d'application pour Laravel, exécute la commande suivante :
php artisan key:generate

Lance les migrations pour configurer la base de données :
php artisan migrate

Pour démarrer le serveur backend Laravel, exécute la commande suivante :
php artisan serve


Ton projet fonctionne bien maintenant, félicitations 🎉 ! Tu peux maintenant gérer et suivre tes tâches avec facilité.



![Image de l'application](frontend/public/taskManager.png)

