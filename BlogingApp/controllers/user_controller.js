const User = require('../models/user_model');
const Blog = require('../models/blog_model');


module.exports.home = async function (req, res) {
    const allBlogs = await Blog.find({});
    res.render("home", {
      user: req.user,
      blogs: allBlogs,
    });
  
}

module.exports.signupPage = function (req, res) {
    return res.render('signup',{ query: req.query });
}

module.exports.loginPage = function (req, res) {
    return res.render('login', { query: req.query });
}

module.exports.BlogPage = function (req, res) {
    return res.render('addBlog',
    {
        user: req.user
    }
    );
}

module.exports.signup = async (req, res) => {
    const { fullname, email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // req.flash('error', 'User with this email already exists. Please log in.');
            return res.redirect(`/user/signup?error=${encodeURIComponent('User with this email already exists. Please log in.')}`);
        }

        const user = await User.create({ fullname, email, password });

        // req.flash('success', 'Signed up successfully. Please log in.');
        return res.redirect('/user/login');
    }
    catch (error) {
        // req.flash('error', 'An error occurred. Please try again.');
        return res.redirect(`/user/signup?error=${encodeURIComponent('An error occurred. Please try again.')}`);
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
       // req.flash('success', 'Logged in successfully');
        console.log('token', token);
        return res.cookie('token', token, { httpOnly: true }).redirect('/'  );
    }
    catch (error) {
        return res.redirect(`/user/login?error=${encodeURIComponent('Invalid credentials or user not found. Please try again.')}`);
   
    }
}

module.exports.logout = function (req, res) {
    return res.clearCookie('token').redirect('/user/login');
}

module.exports.addBlog = async (req, res) => {
    const { title, body, content, coverImageURL } = req.body;
    try {
        const blog = await Blog.create({ title, body, content, coverImageURL, createdBy: req.user._id });
        // req.flash('success', 'Blog added successfully');
        return res.redirect('/');
    }
    catch (error) {
        // req.flash('error', 'An error occurred. Please try again.');
        return res.redirect(`/user/addBlog?error=${encodeURIComponent('An error occurred. Please try again.')}`);
    }
}


