const expressJwt = require('express-jwt');

exports.requireLogin = expressJwt({
    secret: process.env.TOKEN_SECRET,
    userProperty: "auth"
});