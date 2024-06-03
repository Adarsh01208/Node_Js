const Blog = require('../models/blog_model');
const upload = require('./multer');
const path = require('path');

module.exports.blogPage = (req, res) => {
    return res.render('addBlog', {
        user: req.user
    });
};

module.exports.addBlog = [
    upload.single("coverImage"),
    (req, res) => {
        const { title, description } = req.body;
        const coverImageURL = req.file.filename;
        const createdBy = req.user._id;

        const newBlog = new Blog({
            title,
            description,
            coverImageURL,
            createdBy
        });

        newBlog.save()
            .then((blog) => {
                return res.status(200).json({
                    message: 'Blog added successfully',
                    blog
                    
                }  
            );
            console.log(blog);

            })
            .catch((err) => {
                return res.status(400).json({
                    message: 'Failed to add blog',
                    error: err
                });
            });
    }
];

module.exports.getAllBlogs = (req, res) => {
    Blog.find()
        .then((blogs) => {
            return res.status(200).json({
                message: 'All blogs',
                blogs
            });
        })
        .catch((err) => {
            return res.status(400).json({
                message: 'Failed to fetch blogs',
                error: err
            });
        });
};
