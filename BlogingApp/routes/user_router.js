const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

router.get('/', userController.home);
router.get('/user/signup', userController.signupPage);
router.get('/user/login', userController.loginPage);
router.post('/user/signup', userController.signup);
router.post('/user/login', userController.login);
router.get('/user/logout', userController.logout);


module.exports = router;