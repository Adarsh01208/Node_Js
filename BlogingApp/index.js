const express = require('express');
const db = require('./config/connection');
const path = require('path');
const app = express();

const cookieParser = require('cookie-parser');
const checkForAuthencicationAndCookie = require('./middleware/authenication');



const PORT = process.env.PORT || 8000;

 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(checkForAuthencicationAndCookie('token'));


app.use('/', require('./routes/user_router'));
app.use('/', require('./routes/blog_router'));

app.listen(PORT, () => {
    console.log('Server is listening on port 8000');
});
