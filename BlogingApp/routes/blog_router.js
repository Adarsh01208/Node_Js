const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog_controller');
const Blog = require('../models/blog_model');
const Comment = require('../models/comments_models');



router.get('/blog/addblog', blogController.blogPage);
router.post('/blog/addblog', blogController.addBlog);

router.get('/blog/addblog', blogController.blogPage);
router.post('/blog/addblog', blogController.addBlog);

router.get("/blog/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("createdBy");
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const comments = await Comment.find({ blogId: req.params.id }).populate("createdBy");

        return res.render("viewblog", {
            user: req.user,
            blog,
            comments,
        });
    } catch (err) {
        return res.status(400).json({
            message: 'Failed to fetch blog or comments',
            error: err
        });
    }
});

router.post("/blog/comment/:blogId", async (req, res) => {
    try {
        await Comment.create({
            content: req.body.content,
            blogId: req.params.blogId,
            createdBy: req.user._id,
        });
        return res.redirect(`/blog/${req.params.blogId}`);
    } catch (err) {
        return res.status(400).json({
            message: 'Failed to add comment',
            error: err
        });
    }
});

module.exports = router;