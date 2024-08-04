module.exports.requireAuth = (req, res, next) => {
  if (!req.session.userId) {
      return res.redirect('/auth/login');
  }
  next();
};

module.exports.requireAdmin = (req, res, next) => {
  if (!req.session.userId || req.session.userRole !== 'admin') {
      return res.redirect('/auth/login');
  }
  next();
};

