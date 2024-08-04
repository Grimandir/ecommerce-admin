### Manuel d'Utilisation Complet

#### Installation

1. **Cloner le dépôt :**
   git clone https://github.com/votre-nom-utilisateur/ecommerce-admin.git
   cd ecommerce-admin

Installer les dépendances :
npm install

Créer un fichier .env :
Créez un fichier .env à la racine du répertoire avec le contenu suivant :
DB_HOST=votre_hôte_db
DB_USER=votre_utilisateur_db
DB_PASS=votre_mot_de_passe_db
DB_NAME=nom_de_votre_db
SESSION_SECRET=votre_clé_secrète
Configurer la base de données :

Initialisez votre base de données MySQL avec les commandes SQL fournies.

Démarrer l'application :

npm start
Utilisation
Accéder au panneau d'administration :

Ouvrez votre navigateur et accédez à http://localhost:3000/auth/login.
Se connecter :

Entrez votre email et mot de passe d'administrateur pour vous connecter.
Gestion des utilisateurs :

Naviguez vers la section "Utilisateurs" pour ajouter, modifier ou supprimer des utilisateurs.
Gestion des produits :

Naviguez vers la section "Produits" pour ajouter, modifier ou supprimer des produits.
Gestion des commandes :

Naviguez vers la section "Commandes" pour voir les commandes et mettre à jour leur statut.
Voir le tableau de bord :

Le tableau de bord affiche les statistiques clés sur les utilisateurs, les produits et les commandes.
Structure Detaillée du Projet

ecommerce-admin/
├── node_modules/
├── public/
│   ├── admin-styles.css
│   └── admin.html
├── routes/
│   ├── admin.js
│   ├── auth.js
│   ├── users.js
│   └── products.js
├── views/
│   └── login.ejs
├── .env
├── .gitignore
├── app.js
├── package.json
├── Procfile
└── README.md

Détails des Fichiers et Dossiers
node_modules/: Contient les modules Node.js installés.

public/:
admin-styles.css: Fichier CSS pour styliser l'interface administrateur.
admin.html: Fichier HTML de l'interface administrateur (non utilisé directement car nous utilisons ejs pour les vues).

routes/:
admin.js: Gère les routes pour le tableau de bord administrateur.
auth.js: Gère les routes pour l'authentification (login, logout).
users.js: Gère les routes pour la gestion des utilisateurs (CRUD).
products.js: Gère les routes pour la gestion des produits (CRUD).

views/:
login.ejs: Vue pour la page de connexion.
.env: Fichier pour les variables d'environnement (non inclus dans le dépôt).
.gitignore: Fichier pour ignorer les fichiers et dossiers lors des commits Git (node_modules, .env).
app.js: Point d'entrée principal de l'application. Configure et démarre le serveur Express.
package.json: Fichier de configuration du projet Node.js, contenant les dépendances et les scripts.
Procfile: Fichier de configuration pour déployer l'application sur Heroku.
README.md: Documentation du projet.