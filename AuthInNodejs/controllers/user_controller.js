
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
  return res.render('secret', {
    title: "Secret"
  });
}
module.exports.register = async function (req, res) {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.render('register', { title: "Register", error: "User already exists" })
    }

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    return res.redirect('/login');
  }
  catch (err) {
    console.log('Error in registering user', err);
    return res.redirect('back');
  }
}

module.exports.login = async function (req, res) {
  try {
    // check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      //check if password matches
      const pass = req.body.password === user.password;
      if (pass) {

        res.render("secret" , {
        title: "Secret",
        user: user.name
         } );
      } else {
        res.status(400).json({ error: "password doesn't match" });
      }
    } else {
      res.status(400).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    res.status(400).json({ error });
    console.log("Error in logging in user", error);
  }
}

module.exports.logout = function (req, res) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
}

module.exports.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}