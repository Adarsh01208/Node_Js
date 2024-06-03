const JWT = require('jsonwebtoken');
const SECRET_KEY = 'your secret key';

function createUserToken(user) {
   const payload = {
         id: user._id,
         email: user.email,
        fullname: user.fullname,
         profileImageURL: user.profileImageURL
    };
    const token = JWT.sign(payload, SECRET_KEY);
    return token;
   }

function verifyToken(token) {
    return JWT.verify(token, SECRET_KEY);
}

module.exports = {
    createUserToken,
    verifyToken
};
