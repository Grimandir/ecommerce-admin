# MaBoutique - Site E-commerce

## Introduction

MaBoutique est un site e-commerce de vente de vêtements pour hommes, femmes et enfants. Ce projet inclut des fonctionnalités d'administration, de gestion des produits, des utilisateurs, des avis et notations, des listes de souhaits, de l'historique des commandes, des filtres de recherche avancés et de paiement sécurisé via Stripe.

## Fonctionnalités

- Gestion des utilisateurs et des produits
- Avis et notations des produits
- Liste de souhaits
- Historique des commandes
- Notifications par email
- Filtrage avancé des produits
- Paiement sécurisé via Stripe
- Interface d'administration

## Installation

1. Clonez le repository:
    ```sh
    git clone https://github.com/votre-repository.git
    ```

2. Installez les dépendances:
    ```sh
    cd ecommerce-admin
    npm install
    ```

3. Configurez les variables d'environnement en créant un fichier `.env`:
    ```env
    DB_HOST=localhost
    DB_USER=votre_utilisateur
    DB_PASS=votre_mot_de_passe
    DB_NAME=ecommerce
    SESSION_SECRET=your_secret_key
    EMAIL_USER=votre_email@gmail.com
    EMAIL_PASS=votre_mot_de_passe_email
    STRIPE_SECRET_KEY=your_stripe_secret_key
    BASE_URL=http://localhost:3000
    ```

4. Démarrez l'application:
    ```sh
    npm start
    ```

## Utilisation

- Accédez à l'application à `http://localhost:3000`
- Connectez-vous en tant qu'administrateur pour gérer les produits et les utilisateurs
- Les utilisateurs peuvent s'inscrire, ajouter des produits à leur liste de souhaits, laisser des avis et notations, et passer des commandes sécurisées.

## Contribution

Les contributions sont les bienvenues! Veuillez soumettre une pull request ou ouvrir une issue pour discuter des changements que vous souhaitez apporter.

## Licence

Ce projet est sous licence MIT.
