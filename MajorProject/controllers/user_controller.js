
// require the user model
const User = require('../models/user');

module.exports.profile = async function (req, res) {
    if (req.cookies.user_id) {
        try {
            let user = await User.findById(req.cookies.user_id);
    
            if (user) {
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                });
            } else {
                return res.redirect('/user/sign-in');
            }
        } catch (err) {
            console.log('Error in finding user:', err);
            return res.redirect('/user/sign-in');
        }
    } else {
        return res.redirect('/user/sign-in');
    }
        
}
// render the sign up page
module.exports.signUp = function (req, res) {
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn = function (req, res) {
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}


// get the sign up data
module.exports.create = async function (req, res) {
    // TODO
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            await User.create(req.body);
            return res.redirect('/user/sign-in');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('error in finding user in signing up', err);
        return res.redirect('back');
    }
}

// sign in and create a session for the user
module.exports.createSession = async function (req, res) {
    // TODO
    // find the user
    try {
        let user = await User.findOne({ email: req.body.email });
    
        if (!user) {
            // handle user not found
            return res.redirect('back');
        }
    
        if (user.password != req.body.password) {
            return res.redirect('back');
        }
    
        // handle session creation
        res.cookie('user_id', user.id);
         console.log('cookie created', user.id);
        return res.redirect('/user/profile');

    

    } catch (err) {
        console.log('error in finding user in signing in');
        return;
    }
}

module.exports.destroySession = function (req, res) {
    res.clearCookie('user_id');
    return res.redirect('/');
}
