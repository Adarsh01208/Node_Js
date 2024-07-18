const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/user_controller');
const { isLoggedIn, isNotLoggedIn } = require('../auth/authMiddleware');

// Home page
router.get('/', userController.home);

// Register and login pages should be accessible only if not logged in
router.get('/register', isNotLoggedIn, userController.registerPage);
router.get('/login', isNotLoggedIn, userController.loginPage);

// Secret page should be accessible only if logged in
router.get('/secret', isLoggedIn, userController.secretPage);

// Register and login actions
router.post('/register', userController.register);
router.post('/login', userController.login);

// Logout
router.get('/logout', userController.logout);

module.exports = router;
