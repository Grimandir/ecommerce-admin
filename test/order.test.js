const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const { expect } = chai;
chai.use(chaiHttp);

describe('Order', () => {
  let user;
  let product;

  before((done) => {
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.once('open', () => {
      console.log('Connected to MongoDB for testing');
      done();
    });
  });

  after((done) => {
    mongoose.connection.close();
    done();
  });

  beforeEach((done) => {
    Promise.all([
      User.deleteMany({}),
      Product.deleteMany({}),
      Order.deleteMany({})
    ]).then(() => {
      user = new User({ nom: 'Order User', email: 'orderuser@example.com', mot_de_passe: 'password123' });
      product = new Product({ nom: 'Order Product', description: 'Order Description', prix: 100, categorie: 'Order', taille: 'M', stock: 10 });
      return Promise.all([user.save(), product.save()]);
    }).then(() => {
      done();
    });
  });

  it('should create a new order', (done) => {
    const order = new Order({
      utilisateur_id: user._id,
      produits: [{ produit_id: product._id, quantite: 2, prix: product.prix }],
      total: 200,
      statut: 'En attente'
    });

    order.save()
      .then((order) => {
        expect(order.isNew).to.be.false;
        done();
      })
      .catch((err) => done(err));
  });

  it('should fetch all orders', (done) => {
    const order = new Order({
      utilisateur_id: user._id,
      produits: [{ produit_id: product._id, quantite: 2, prix: product.prix }],
      total: 200,
      statut: 'En attente'
    });

    order.save()
      .then(() => {
        chai.request(app)
          .get('/admin/orders')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(1);
            done();
          });
      });
  });
});
