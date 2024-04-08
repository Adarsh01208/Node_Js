const moongose = require('mongoose');
// Schema is a blueprint of the model
const userSchema = new moongose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    // This will add createdAt and updatedAt fields to the schema
    timestamps: true
});

const User = moongose.model('User', userSchema);    // User is the name of the model
module.exports = User;