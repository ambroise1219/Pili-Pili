# Pili Pili - Application de Vente de Plats Rapides en Ligne

## À propos du projet

Pili Pili est une application mobile développée avec React Native et Expo, conçue pour faciliter la commande et la livraison de plats rapides. Cette application permet aux utilisateurs de parcourir un menu, de passer des commandes et de suivre leurs livraisons en temps réel.

## Table des matières

1. [Technologies utilisées](#technologies-utilisées)
2. [Structure du projet](#structure-du-projet)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Utilisation](#utilisation)
6. [Fonctionnalités](#fonctionnalités)
7. [Contribution](#contribution)
8. [Licence](#licence)

## Technologies utilisées

- React Native
- Expo
- Sanity CMS (pour le backend)

## Structure du projet

```
pili-pili/
│
├── assets/             # Images et ressources statiques
├── backend/            # Logique de gestion d'état
├── components/         # Composants réutilisables
├── constants/          # Données constantes et données factices locales
├── livraison-app/      # Backend Sanity CMS
├── screens/            # Écrans de l'application
├── App.js              # Point d'entrée de l'application
└── package.json        # Dépendances et scripts
```

## Installation

1. Clonez ce dépôt :
   ```
   git clone https://github.com/ambroise1219/Pili-Pili.git
   ```

2. Naviguez dans le répertoire du projet :
   ```
   cd pili
   ```

3. Installez les dépendances :
   ```
   npm install
   ```

## Configuration

1. Configurez votre projet Sanity CMS dans le dossier `livraison-app/`.
2. Mettez à jour les constantes dans le dossier `constants/` si nécessaire.

## Utilisation

Pour lancer l'application en mode développement :

```
expo start
```

## Fonctionnalités

- Parcourir le menu des plats rapides
- Ajouter des articles au panier
- Passer une commande
- Suivre l'état de la livraison 

 
