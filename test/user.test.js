const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/User');

const { expect } = chai;
chai.use(chaiHttp);

describe('User', () => {
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
    User.deleteMany({}, (err) => {
      done();
    });
  });

  it('should create a new user', (done) => {
    const user = new User({ nom: 'Test User', email: 'testuser@example.com', mot_de_passe: 'password123' });
    user.save()
      .then((user) => {
        expect(user.isNew).to.be.false;
        done();
      })
      .catch((err) => done(err));
  });

  it('should not create a user with the same email', (done) => {
    const user1 = new User({ nom: 'Test User 1', email: 'duplicate@example.com', mot_de_passe: 'password123' });
    const user2 = new User({ nom: 'Test User 2', email: 'duplicate@example.com', mot_de_passe: 'password123' });
    user1.save()
      .then(() => {
        user2.save((err) => {
          expect(err).to.exist;
          done();
        });
      });
  });

  it('should authenticate a user', (done) => {
    const user = new User({ nom: 'Auth User', email: 'authuser@example.com', mot_de_passe: 'password123' });
    user.save()
      .then(() => {
        chai.request(app)
          .post('/auth/login')
          .send({ email: 'authuser@example.com', mot_de_passe: 'password123' })
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
  });
});
