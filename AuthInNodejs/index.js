const express = require('express')
const app = express()
const port = 3000
const db = require('./connection/connection')
const path = require('path')
const User = require('./models/user')

const bodyParser = require('body-parser')


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', require('./routers/user_routes'))

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})
