const express = require('express');
// require the cookie parser
const cookieParser = require('cookie-parser');
// require the express layout
const expresslayout = require('express-ejs-layouts')
const app = express();
const port = 8000;


// use cookie parser
app.use(cookieParser());

// use express urlencoded to parse the form data
app.use(express.urlencoded());

// require the database
const db = require('./config/mongoose');

// use inbuilt middleware to serve static files
app.use(express.static('./assets'));

// using express router to route the requests to the controller 
app.use(expresslayout)



// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

 



// express router
app.use('/',require('./routes'))

//set up the view engine
app.set('view engine' , 'ejs'),
app.set('views', './views')


//listening to the port
app.listen(port, (err)=>{
    if (err){
        console.log(`Error in running the server: ${err}`); 
    }
    console.log(`Server is running on port ${port}`);
});