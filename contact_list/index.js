const express = require('express')
const path = require('path');
const port = 8000;
const Contact = require('./models/contact');
const db = require('./config/mongoose');


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
        phoneno: "1245698568"
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

    // Contact.find({}, function (err, contacts) {
    //     if (err) {
    //         console.log('erroe in fetching the contact')
    //         return;
    //     }
    //     return res.render('Home',
    //         {
    //             title: "My Contact List",
    //             contacts: contacts
    //         });
    // });
    Contact.find({}).then(function (contacts) {
        return res.render('Home',
            {
                title: "My Contact List",
                contacts: contacts
            });
    }).catch(function (err){
        console.log(err);
    })
});

app.post('/create_contact', (req, res) => {
    // console.log(res);
    //   return  res.redirect('/practice');
    console.log(req.body);
    // contact_list.push(req.body);
    //  return res.redirect('back')

    // Contact.create(req.body).then(function (contact) {
    //     console.log(contact);
    //     return res.redirect('back');
    // }).catch(function (err) {
    //     console.log('error in creating a contact');
    //     return;
    // });

    Contact.create(req.body).then(result => { 
        console.log(result) 
        return res.redirect('back')
    }).catch(error => {
        console.log(error);
        return;
    })

});


app.get('/delete_contact', (req, res) => {
    console.log(req.query);

    const id = req.query.id;
    console.log(id);

    Contact.findByIdAndDelete(id).then(result => {
        console.log(result);
    }).catch(error => {
        console.log(error);
    })

    //  let phoneno = req.query.phoneno;
    // let contactIndex = contact_list.findIndex(contact => contact.phoneno == phoneno);
    // if (contactIndex != -1) {
    //     contact_list.splice(contactIndex, 1);
    // }
    return res.redirect('back');
});

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