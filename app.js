require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const mysql = require('mysql2/promise');
const helmet = require('helmet');
const sanitize = require('mongo-sanitize');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const { MongoClient } = require('mongodb');

// Créer une application Express
const app = express();

// Connexion à MongoDB pour les statistiques
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connexion à MySQL pour les autres données
const mysqlConnection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Middlewares
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  req.body = sanitize(req.body);
  req.query = sanitize(req.query);
  req.params = sanitize(req.params);
  next();
});

// Configuration de session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
}));

// Utilisation de connect-flash pour les messages flash
app.use(flash());

// Middleware global pour les messages flash
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success');
  res.locals.error_messages = req.flash('error');
  next();
});

// Moteur de vues
app.set('view engine', 'ejs');

// Routes statiques
app.use(express.static(path.join(__dirname, 'public')));

// Import des routes
const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const wishlistRoutes = require('./routes/wishlist');
const orderHistoryRoutes = require('./routes/orderHistory');
const reviewsRoutes = require('./routes/reviews');
const searchRoutes = require('./routes/search');
const contactRoutes = require('./routes/contact');
const categoryRoutes = require('./routes/categories');

// Utilisation des routes
app.use('/', indexRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/wishlist', wishlistRoutes);
app.use('/orderHistory', orderHistoryRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/search', searchRoutes);
app.use('/contact', contactRoutes);
app.use('/categories', categoryRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});






