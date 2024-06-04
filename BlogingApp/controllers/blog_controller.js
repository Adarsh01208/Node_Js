const Blog = require('../models/blog_model');
const upload = require('./multer');
const path = require('path');

module.exports.blogPage = (req, res) => {
    return res.render('addBlog', {
        user: req.user
    
    });
};


// module.exports.addBlog = [
//     upload.single('coverImage'),
//     (req, res) => {
//         const { title, description } = req.body;
//         const coverImageURL = req.file ? req.file.filename : null;
//         const createdBy = req.user._id;

//         const newBlog = new Blog({
//             title,
//             description,
//             coverImageURL,
//             createdBy
//         });

//         newBlog.save()
//             .then(blog => {
//                 return res.status(200).json({
//                     message: 'Blog added successfully',
//                     blog
//                 });
//             })
//             .catch(err => {
//                 return res.status(400).json({
//                     message: 'Failed to add blog',
//                     error: err
//                 });
//             });
//     }
// ];

module.exports.addBlog = [
    upload.single('coverImage'),
    async (req, res) => {
        const { title, description } = req.body;
        const coverImageURL = req.file ? req.file.filename : null;
        const createdBy = req.user._id;
        console.log(req.user._id)

        try {
            const newBlog = new Blog({
                title,
                description,
                coverImageURL,
                createdBy
            });

            await newBlog.save();
            console.log(newBlog)
            // Redirect to home
            return res.redirect('/');
        } catch (err) {
            return res.status(400).json({
                message: 'Failed to add blog',
                error: err
            });
        }
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

