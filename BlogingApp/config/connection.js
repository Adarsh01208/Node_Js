const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BlogingApp',)
    .then(() => {
        console.log('MongoDb Connected Successfully');
    }).catch((e) => {
        console.log('No Connection');
    }
    );

module.exports = mongoose;