const Post = require('../models/Posts');  //model
const User = require('../models/Users');  //model


exports.getPosts = async (req, res)=>{

    Post.findAll({ include: { model: User}})
        .then(posts => {
            if(posts) res.json(posts);
        })
        .catch(err => res.json(err))

};

exports.createPost = async (req, res)=>{

    Post.create({
        title: req.body.title,
        body: req.body.body,
        userId: req.profile.id
    })
        .then( post => {
            Post.findAll({where:{id: post.id}, include: { model: User}})
                .then(post => res.json({post: post}))
        })
        .catch(err => res.json(err))


};


exports.postsByUser = async (req, res) => {

    Post.findAll({ where: {userId: req.profile.id}})
        .then(post => res.json({ post: post}))
        .catch(err => res.json(err))
};





