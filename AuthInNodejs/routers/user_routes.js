const express = require('express');
const router = express.Router();
const passport = require('passport');   
const User = require('../models/user');


const userController = require('../controllers/user_controller');

router.get('/', userController.home);
router.get('/register', userController.registerPage);
router.get('/login', userController.loginPage);
router.get('/secret', userController.isLoggedIn, userController.secretPage);

router.post('/register', userController.register);
router.post('/login',  userController.login);
router.get('/logout', userController.logout);

module.exports = router;