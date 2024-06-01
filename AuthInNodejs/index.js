const express = require('express')
const app = express()
const port = 3000
const db = require('./connection/connection')
const path = require('path')
const User = require('./models/user')
const expresslayouts = require('express-ejs-layouts')

const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')
const LocalStrategy = require('passport-local').Strategy
const passportLocalMongoose = require('passport-local-mongoose')

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: "Rusty is a dog",
    resave: false,
    saveUninitialized: false
}));
 
app.use(passport.initialize());
app.use(passport.session());
 
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', require('./routers/user_routes'))

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})
