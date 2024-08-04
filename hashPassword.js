const bcrypt = require('bcrypt');

const password = 'votre_mot_de_passe_admin';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
  } else {
    console.log(hash);
  }
});
