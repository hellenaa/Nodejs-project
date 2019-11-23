//model
const User = require('../models/Users');
const Post = require('../models/Posts');



exports.allUsers = async (req, res)=>{
    User.findAll({ include: { model: Post, attributes: ['title']}})
        .then(users => {
            res.json(users);
        })
        .catch(err => res.status(400).json({ error:err }));

};

exports.getUser = async (req, res)=>{

    return res.json(req.profile);
};


exports.userById = async (req, res, next, id)=>{
    User.findByPk(id)
        .then(user => {
            if(!user) return res.status(400).json( "User not found" );

            req.profile = user;
            next();
        })
        .catch(err => {
            return res.status(400).json({ error: "User not found" });
        })
};


exports.hasAuthorized = async (req, res, next)=>{
    const authorized = req.profile && req.auth && req.profile.id===req.auth.id;
    if(!authorized) {
        return res.status(403).json({
            error: "User is not authorized to perform this action"
        })
    }
    next();
};

