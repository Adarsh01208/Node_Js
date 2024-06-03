const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog_controller');

router.get('/blog/addblog', blogController.blogPage);
router.post('/blog/addblog', blogController.addBlog);


module.exports = router;
