const express = require('express')
const app = express()
const port = 3000
const db = require('./connection/connection')
const User = require('./models/user')
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', require('./routers/user_routes'))

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})
