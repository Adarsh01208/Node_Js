const express = require('express');
// require the cookie parser
const cookieParser = require('cookie-parser');

const app = express();
const port = 8000;
// require the express layout
const expresslayout = require('express-ejs-layouts')
// require the database
const db = require('./config/mongoose');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

// use sass middleware
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));


app.use(expresslayout)
// use cookie parser
app.use(cookieParser());

// use express urlencoded to parse the form data
app.use(express.urlencoded(express.urlencoded({ extended: true })));



// use inbuilt middleware to serve static files
app.use(express.static('./assets'));

// using express router to route the requests to the controller 




// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




//set up the view engine
app.set('view engine', 'ejs'),
    app.set('views', './views')

// setting up the session cookie
//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'MajorProject',
    // TODO change the secret before deployment in production mode
    secret: 'blah something',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/MajorProject',
        autoRemove: 'disabled'
    }),function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// express router
app.use('/', require('./routes'));




//listening to the port
app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port ${port}`);
});