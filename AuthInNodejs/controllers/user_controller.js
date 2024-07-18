const passport = require('passport');
const User = require('../models/user');

module.exports.home = function (req, res) {
  return res.render('home', {
    title: "Home"
  });
}

module.exports.registerPage = function (req, res) {
  return res.render('register', {
    title: "Register"
  });
}

module.exports.loginPage = function (req, res) {
  return res.render('login', {
    title: "Login"
  });
}

module.exports.secretPage = function (req, res) {
  if (req.isAuthenticated()) {
    return res.render('secret', {
      title: "Secret",
      username: req.user.username
    });
  } else {
    return res.redirect('/login');
  }
}

module.exports.register = async function (req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new Error('All fields are required');
    }
    const user = new User({ username, email });
    await User.register(user, password);
    return res.redirect('/login');
  } catch (err) {
    console.log('Error in registering user', err);
    return res.redirect('back');
  }
}

module.exports.login = function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.redirect('/secret');
    });
  })(req, res, next);
}

module.exports.logout = function (req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
}
