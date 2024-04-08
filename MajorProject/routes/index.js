const express = require('express')
const router =express.Router();
console.log("router")

const homecontroller = require('../controllers/home_controller');

router.get('/',homecontroller.home)
router.use('/user',require('./user'))

//for any further routes
//routers.use('routername',require('./routerfile'))

module.exports = router