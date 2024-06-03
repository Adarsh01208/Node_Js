const {verifyToken } = require('../config/auth');

function checkForAuthencicationAndCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next();
        }
        try {
            const payload = verifyToken(tokenCookieValue);
            req.user = payload;
            next();
        }
        catch (error) {
           return next();
        }
    }
}

module.exports = checkForAuthencicationAndCookie;
