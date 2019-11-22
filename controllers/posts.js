const Post = require('../models/Posts');  //model
const User = require('../models/Users');  //model
const fs = require('fs'); //file system module



exports.getPosts = async (req, res)=>{

    Post.findAll({ include: { model: User}})
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
    console.log(post.photo);

    Post.create({
        title: post.title,
        body: post.body,
        userId: post.postedBy,
        photo: post.photo
    })
        .then(post => {
            Post.findAll({where:{id: post.id}, include: { model: User}})
                .then(post => res.json({post: post}))
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err));

};


exports.postsByUser = async (req, res) => {

    Post.findAll({ where: {userId: req.profile.id}})
        .then(post => res.json({ post: post}))
        .catch(err => res.json(err))
};





