const express = require('express')
const path = require('path');
const port = 8000;



const app = express();

app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname, 'views'));


app.get('/', function(req , res){
   // console.log(req);
  // console.log(__dirname);
    // res.send('Cool it is running or is it?');
    return res.render('Home');

});

app.get('/home', (req , res)=> {
    res.send('<h1> Welcome To Home  Page </h1>');
})


app.listen(port , (err)=>{

    if(err)
    {
        console.log("Error in running the server" , err);
        return;
    }

    console.log("Yup!My Express Server is running on port: " , port);

});
