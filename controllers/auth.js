const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');  //encrypt password
const User = require('../models/Users');  //model


exports.registerUser = async (req, res)=>{
console.log(req.body.email);
    //check if user already exist
    let emailExist = await User.findOne({where: { email: req.body.email.trim() }});
    if(emailExist) return res.status(400).json({error:'Email already exist'});

    //save user to database
    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        plainPassword: req.body.plainPassword
    })
        .then(user => {
            res.json({user: user.id})
        })
        .catch(err => res.json(err))
};


exports.loginUser = async (req, res)=>{

    //check if user exist
    let user = await User.findOne({where: { email: req.body.email }});
    if(!user) return res.status(403).json({ error: 'User not found'});


    //check if password is correct
    await bcrypt.compare(req.body.password, user.password, function(err, result) {
        if(!result) res.status(400).json({error: 'Password is wrong'});

        //jwt token creating
        const token = jwt.sign({id: user.id}, process.env.TOKEN_SECRET);

        if(token) {
            res.cookie('t', token);

            const {id, firstName} = user;
            res.json({token, user: {id, firstName}});
        }


    });
};

exports.logoutUser = async (req, res) => {
    res.clearCookie('t');
    return res.json({message: "Logout success!"})
};

