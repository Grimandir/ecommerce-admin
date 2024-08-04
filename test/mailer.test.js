const nodemailer = require('nodemailer');
const chai = require('chai');
const sinon = require('sinon');
const mailer = require('../utils/mailer');

const { expect } = chai;

describe('Mailer', () => {
  let transporter;

  beforeEach(() => {
    transporter = {
      sendMail: sinon.stub().callsFake((mailOptions, callback) => {
        callback(null, { response: '250 OK' });
      })
    };

    sinon.stub(nodemailer, 'createTransport').returns(transporter);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should send an email', (done) => {
    mailer('test@example.com', 'Test Subject', 'Test Text');

    expect(transporter.sendMail.calledOnce).to.be.true;
    expect(transporter.sendMail.getCall(0).args[0]).to.include({
      to: 'test@example.com',
      subject: 'Test Subject',
      text: 'Test Text'
    });

    done();
  });
});
