const express = require('express')
const path = require('path');
const port = 8000;

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


//middlewarre 1
//app.use(function(req, res, next){
//req.myName="adarsh";
//console.log("middleware 1 Called ")
//next();
//});

//middlewarre 2
//app.use(function(req, res, next){
// console.log('my Name from mw2',req.myname);
//console.log("middleware 2 Called ")
//next();
//});

var contact_list = [
    {
        name: "Adarsh",
        phoneno: "124569856"
    },
    {
        name: "Aman",
        phoneno: "7806466682"
    },
    {
        name: "Anmol",
        phoneno: "4575766882"
    }
]


app.get('/', function (req, res) {
    // console.log(req);
    // console.log(__dirname);
    // res.send('Cool it is running or is it?');
    return res.render('Home',
        {
            title: "My Contact List" ,
            contacts: contact_list 
        });

});

app.post('/create_contact', (req, res)=>{
  // console.log(res);
//   return  res.redirect('/practice');
// console.log(req.body);
// console.log(req.body.name)
   contact_list.push(req.body);
   return res.redirect('back')
  // return res.redirect('/');
  

})

app.get('/practice', function (req, res) {
    return res.render('practice', { title: "My Practice Page" });
});


// app.get('/home', (req , res)=> {
//     res.send('<h1> Welcome To Home  Page </h1>');
// })

app.listen(port, (err) => {

    if (err) {
        console.log("Error in running the server", err);
        return;
    }

    console.log("Yup!My Express Server is running on port: ", port);

});
