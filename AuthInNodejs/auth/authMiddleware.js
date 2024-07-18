module.exports = {
    isLoggedIn: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/login');
    },
    
    isNotLoggedIn: function (req, res, next) {
      if (req.isAuthenticated()) {
        return res.redirect('/secret');
      }
      next();
    }
  };