# HackTrack — Plateforme d’organisation de Hackathons

## Description

HackTrack est une plateforme permettant aux étudiants de découvrir et de participer à des hackathons organisés par l'école. Ce projet est une application React permettant aux utilisateurs de s'inscrire à des hackathons, de créer ou de rejoindre des équipes, tout en étant authentifiés. L'API HackTrack fournit les données nécessaires sur les hackathons et les équipes.

L'application intègre plusieurs fonctionnalités telles que la gestion de l'authentification avec JWT, la validation de formulaires, et une interface utilisateur fluide avec React Router.

## Fonctionnalités

- **Page d'accueil** : Présentation de la plateforme et des 3 prochains hackathons.
- **Page des hackathons** : Affichage des hackathons passés, en cours et à venir avec pagination.
- **Page de détail d'un hackathon** : Description complète du hackathon, date, thème, et équipes inscrites.
- **Inscription / Connexion** : Formulaires d'inscription et de connexion.
- **Gestion des équipes** : Création d'équipes et possibilité de rejoindre une équipe existante (réservée aux utilisateurs authentifiés).
- **Déconnexion** : L'utilisateur peut se déconnecter et effacer son JWT.

## Technologies utilisées

- **Frontend** :
  - **React** : Pour la construction de l'interface utilisateur.
  - **Vite** : Pour initialiser le projet React rapidement.
  - **React Router** : Pour la gestion de la navigation.
  - **React Hook Form** : Pour la gestion des formulaires. (Pas eu le temps de l'utiliser)
  - **Zod** : Pour la validation des formulaires.  
  - **Tailwind CSS** : Pour le style et la mise en page.
  - **JWT** : Pour l'authentification des utilisateurs.
  - **localStorage** : Pour stocker le JWT après la connexion.

- **API Backend** :
  - **HackTrack API** : [GitHub - HackTrack API](https://github.com/hellodamien/hacktrack-api).

## Installation

### Prérequis

- Node.js
- npm ou yarn

### Installation du projet

1. Clonez ce repository :
    ```bash
    git clone <url-du-repository>
    ```
2. Allez dans le répertoire du projet :
    ```bash
    cd <nom-du-dossier>
    ```
3. Installez les dépendances :
    ```bash
    npm install
    ```
4. Lancez le projet avec :
    ```bash
    npm run dev
    ```
5. Ouvrez votre navigateur et allez à `http://localhost:3002`.

## Structure du projet

- **src**
  - **components** : Composants réutilisables comme la Navbars
  - **pages** : Pages principales telles que `/`, `/hackathons`, `/hackathons/:id`, `/register`, `/login`.
  - **context** : Gestion de l'authentification avec React Context API.
  - **utils** : Fonctions utilitaires comme les appels API.
  - **styles** : Fichiers de styles globaux avec tailwinds.css

## Fonctionnalités principales

### 1. Authentification

- **Inscription** : Les utilisateurs peuvent créer un compte avec un email et un mot de passe.
- **Connexion** : Les utilisateurs existants peuvent se connecter avec leur email et mot de passe.
- **Déconnexion** : Les utilisateurs peuvent se déconnecter et leur JWT sera effacé du `localStorage`.

### 2. Navigation avec React Router

- **Page d'accueil** : Affiche les 3 prochains hackathons.
- **Page des hackathons** : Affiche tous les hackathons passés, en cours et à venir, avec pagination.
- **Page de détail d'un hackathon** : Affiche les détails d'un hackathon particulier, ainsi que les équipes inscrites.
- **Pages d'inscription et de connexion** : Permettent aux utilisateurs de s'inscrire et de se connecter.

### 3. Gestion des équipes

- **Créer une équipe** : Un utilisateur peut créer une équipe pour un hackathon spécifique.
- **Rejoindre une équipe** : Les utilisateurs connectés peuvent rejoindre une équipe existante pour participer à un hackathon.

### 4. Validation avec Zod

- **Définir un schéma** : Utilise `z.object({...})` pour définir la forme attendue d’un objet (ex : formulaire d’inscription).
- **Valider des données** : Grâce à `schema.parse(data)`, tu peux valider que les données respectent bien le schéma. En cas d’erreur, Zod lève une exception.
- **Gestion des erreurs** : Utilise `safeParse` pour récupérer les erreurs sans lever d’exception et les afficher proprement à l’utilisateur.

## Gestion des erreurs

L'application gère les erreurs de manière propre, en affichant des messages d'erreur clairs à l'utilisateur en cas de problème, que ce soit pour l'authentification ou lors de la gestion des hackathons et des équipes.

## Bonnes pratiques

- Utilisation de **React Context API** pour la gestion de l'état d'authentification.
- **Responsive design** grâce à **Tailwind CSS** pour offrir une expérience utilisateur fluide sur mobile et desktop.
- **Gestion des erreurs API** : Affichage de messages d'erreur appropriés pour toute interaction échouée avec l'API.
  
## Critères de soumission

- L'interface est responsive et utilise Tailwind CSS.
- La gestion de l'authentification via JWT et Context API est correctement implémentée.

## Auteurs

- **Victor Falc'hun** - Développeur principal


## Licence

Certaines parties de ce projet, comme la documentation et des suggestions de code, ont également été générées grâce à l'IA.
Ce projet est sous licence MIT - consultez le fichier [LICENSE](LICENSE) pour plus de détails.

