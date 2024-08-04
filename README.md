# E-commerce Admin

## Description

Ceci est un panneau d'administration pour gérer un site e-commerce de vente de vêtements. Il inclut des fonctionnalités pour gérer les utilisateurs, les produits et les commandes, ainsi qu'un tableau de bord pour visualiser les statistiques clés.

## Fonctionnalités

- Authentification des administrateurs (connexion/déconnexion)
- Gestion des utilisateurs (ajout, modification, suppression)
- Gestion des produits (ajout, modification, suppression)
- Visualisation et gestion des commandes
- Tableau de bord pour visualiser les statistiques clés

## Installation

### Prérequis

- Node.js et npm installés
- Base de données MySQL
- Git installé
- Heroku CLI (optionnel, pour le déploiement)

### Étapes

1. Cloner le dépôt :

   git clone https://github.com/votre-nom-utilisateur/ecommerce-admin.git
   cd ecommerce-admin

Installer les dépendances :
npm install

Créer un fichier .env à la racine du répertoire et ajouter vos informations de configuration :
.env

DB_HOST=votre_hôte_db
DB_USER=votre_utilisateur_db
DB_PASS=votre_mot_de_passe_db
DB_NAME=nom_de_votre_db
SESSION_SECRET=votre_clé_secrète
Initialiser la base de données avec les tables nécessaires (voir ci-dessous pour les commandes SQL).

Démarrer l'application :

npm start
Configuration de la Base de Données
Commandes SQL
CREATE DATABASE ecommerce;

USE ecommerce;

-- Table administrateurs
CREATE TABLE administrateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL
);

-- Table utilisateurs
CREATE TABLE utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table produits
CREATE TABLE produits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    prix DECIMAL(10, 2) NOT NULL,
    categorie VARCHAR(255),
    taille VARCHAR(50),
    stock INT DEFAULT 0,
    date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table commandes
CREATE TABLE commandes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT,
    total DECIMAL(10, 2) NOT NULL,
    statut VARCHAR(50) DEFAULT 'En attente',
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);

-- Table details_commande
CREATE TABLE details_commande (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commande_id INT,
    produit_id INT,
    quantite INT NOT NULL,
    prix DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (commande_id) REFERENCES commandes(id),
    FOREIGN KEY (produit_id) REFERENCES produits(id)
);

Déploiement
Cette application peut être déployée sur Heroku.

Créer une nouvelle application Heroku :

heroku create ecommerce-admin

Pousser le code vers Heroku :
git push heroku master

Configurer les variables d'environnement sur Heroku :
heroku config:set DB_HOST=votre_hôte_db DB_USER=votre_utilisateur_db DB_PASS=votre_mot_de_passe_db DB_NAME=nom_de_votre_db SESSION_SECRET=votre_clé_secrète

Usage
Accès au Panneau d'Administration
Naviguez vers la page de connexion : /auth/login
Entrez vos identifiants administrateur.
Après une connexion réussie, vous serez redirigé vers le tableau de bord.
Gestion des Utilisateurs
Accédez à la section Utilisateurs depuis le menu de navigation.
Vous pouvez ajouter un nouvel utilisateur, modifier des utilisateurs existants ou supprimer des utilisateurs.
Gestion des Produits
Accédez à la section Produits depuis le menu de navigation.
Vous pouvez ajouter un nouveau produit, modifier des produits existants ou supprimer des produits.
Visualisation et Gestion des Commandes
Accédez à la section Commandes depuis le menu de navigation.
Vous pouvez voir la liste des commandes, voir les détails des commandes et mettre à jour le statut des commandes.
Visualisation du Tableau de Bord
Le tableau de bord fournit des statistiques clés sur les utilisateurs, les produits et les commandes.
Contribuer
N'hésitez pas à soumettre des issues et des pull requests.

Licence
Ce projet est sous licence MIT.
