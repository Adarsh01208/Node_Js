const passport = require('passport');
var Localstrategy = require('passport-local').Strategy;
const User = require('../models/user');


// authentication using passport
passport.use(new Localstrategy({
    usernameField: 'email'
},
async function( email, password, done) {
    try {
        let user = await User.findOne({email: email});

        if (!user || user.password != password) {
            console.log('Invalid Username/Password');
            return done(null, false);
        }

        return done(null, user);
    } catch (err) {
        console.log('Error in Passport -> Local Strategy', err);
        return;
    }
}
   
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
    try {
        let user = await User.findById(id);
        if (user) {
            done(null, user);
        } else {
            done(new Error('User not found'));
        }
    } catch (err) {
        done(err);
    }
});


// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not signed in
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
};




module.exports = passport;
