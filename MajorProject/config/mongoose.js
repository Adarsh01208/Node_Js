const moongose = require('mongoose');
moongose.connect('mongodb://localhost/major_project');
const db = moongose.connection;
db.on('error', console.error.bind(console, 'Error in connecting to MongoDB'));
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;

