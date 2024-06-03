const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');
const { createUserToken } = require('../config/auth');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    profileImageURL: {
        type: String,
        default: 'https://www.gravatar.com/avatar/'

    }
}, { timestamps: true });

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return;
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac('sha256', salt).update
        (user.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassword;
    next();
});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('User not found');
    const salt = user.salt;
    const userProvidedHash = createHmac('sha256', user.salt)
        .update(password)
        .digest('hex');

    if (userProvidedHash !== user.password) throw new Error('Invalid credentials');

    const token = createUserToken(user);
    return token;

});
module.exports = mongoose.model('User', userSchema);
