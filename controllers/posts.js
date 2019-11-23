const Post = require('../models/Posts');  //model
const User = require('../models/Users');  //model
const fs = require('fs'); //file system module


exports.getPosts = async (req, res)=>{

    Post.findAll({ include: { model: User}, order: [
            ['id', 'DESC']
        ]})
        .then(posts => {
            if(posts) res.json(posts);
        })
        .catch(err => res.json(err))
};

exports.createPost = async (req, res)=> {

    let post = req.body;
    post.postedBy = req.profile.id;
    if(req.file) {
        post.photo = {data: fs.readFileSync(req.file.path), contentType: req.file.mimetype };
    }

    Post.create({
        title: post.title,
        body: post.body,
        userId: post.postedBy,
        photo: post.photo
    })
        .then(post => {
            Post.findAll({where:{id: post.id}, include: { model: User, attributes: ['email']}, attributes: ['id']})
                .then(post => res.json({post}))
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));

};


exports.postsByUser = async (req, res) => {

    Post.findAll({ where: {userId: req.profile.id}, order: [
            ['id', 'DESC']
            ]})
        .then(post => res.json({ post: post}))
        .catch(err => res.json(err))
};

exports.updatePost = async (req, res) => {

    let post = req.body;
    if(req.file) {
        post.photo = {data: fs.readFileSync(req.file.path), contentType: req.file.mimetype };
    }

    Post.update({
        title: post.title,
        body: post.body,
        photo: post.photo
        },
        { where: { id: req.post.id}})
        .then(post => {
            console.log(post);
            res.json( "Post successfully updated");
        })
        .catch(err => {
            return res.status(400).json({ error: "Post not updated, something goes wrong" });
        })

};

exports.deletePost = async (req, res) => {

    let post = req.post;

    Post.destroy({ where: { id: post.id }})
        .then(post => {
            if(post!==1) return res.status(400).json("Post not deleted, something goes wrong" );

            res.json( "Post successfully deleted");
        })
        .catch(err => {
            return res.status(400).json({ error: "Post not deleted, something goes wrong" });
        })
};

exports.postById = async (req, res, next, id)=>{
    Post.findByPk(id)
        .then(post => {
            if(!post) return res.status(400).json( "Post not found" );

            req.post = post;
            next();
        })
        .catch(err => {
            return res.status(400).json({ error: "Post not found" });
        })
};

exports.isPoster = async (req, res, next) => {
    const isPoster = req.post && req.auth && req.post.userId === req.auth.id;

    if(!isPoster) {
        return res.status(403).json({
            error: "User is not authorized to perform this action"
        })
    }
    next();
};






