const express = require('express');
const port = 8000;


const app = express();

app.get('/', function(req , res){
    res.send('Cool it is running or is it?');

});

app.get('/home', (req , res)=> {
    res.send('<h1> Welcome To Home  Page </h1>');
})


app.listen(port,(err)=>{

    if(err)
    {
        console.log("Error in running the server" , err);
        return;
    }

    console.log("Yup!My Express Server is running on port: " , port);

});
