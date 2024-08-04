const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Product = require('../models/Product');

const { expect } = chai;
chai.use(chaiHttp);

describe('Product', () => {
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
    Product.deleteMany({}, (err) => {
      done();
    });
  });

  it('should create a new product', (done) => {
    const product = new Product({ nom: 'Test Product', description: 'Test Description', prix: 100, categorie: 'Test', taille: 'M', stock: 10 });
    product.save()
      .then((product) => {
        expect(product.isNew).to.be.false;
        done();
      })
      .catch((err) => done(err));
  });

  it('should fetch all products', (done) => {
    const product = new Product({ nom: 'Test Product', description: 'Test Description', prix: 100, categorie: 'Test', taille: 'M', stock: 10 });
    product.save()
      .then(() => {
        chai.request(app)
          .get('/products')
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.equal(1);
            done();
          });
      });
  });
});
