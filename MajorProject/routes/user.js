const express = require('express')
const router = express.Router();
const passport = require('passport')
// importing the user controller
const UserController = require('../controllers/user_controller')

// creating routes for user

router.get('/profile', passport.checkAuthentication, UserController.profile)
router.get('/sign-up', UserController.signUp)
router.get('/sign-in', UserController.signIn)
router.post('/create', UserController.create)


router.post('/create-session', passport.authenticate(
    'local',
    { failureRedirect: '/user/sign-in' },
), UserController.createSession)

router.get('/sign-out', UserController.destroySession)
// exporting the router
module.exports = router