const Joi = require('@hapi/joi');

//register validation
exports.registerValidator = (req, res, next) => {

    const schema = Joi.object({
        firstName: Joi.string()
            .min(3)
            .messages({
                'string.base': `"firstName" should be a type of 'text'`,
                'string.empty': `"firstName" cannot be an empty field`,
                'string.min': `"firstName" should have a minimum length of {#limit}`
            }),
        lastName: Joi.string()
            .min(3)
            .messages({
                'string.base': `"lastName" should be a type of 'text'`,
                'string.empty': `"lastName" cannot be an empty field`,
                'string.min': `"lastName" should have a minimum length of {#limit}`
            }),
        email: Joi.string()
            .min(4)
            .required()
            .email()
            .messages({
                'string.base': `"email" should be a type of 'text'`,
                'string.empty': `"email" cannot be an empty field`,
                'string.min': `"email" should have a minimum length of {#limit}`,
                'any.required': `"email" is a required field`,
                'any.email': `"email" must be correct email`
            }),
        plainPassword: Joi.string()
            .min(6)
            .required()
            .messages({
                'string.empty': `"plainPassword" cannot be an empty field`,
                'string.min': `"plainPassword" should have a minimum length of {#limit}`,
                'any.required': `password is a required field`
            }),
        repeat_password: Joi.any()
            .required()
            .equal(Joi.ref('plainPassword'))
            .messages({
                'any.required': `"repeat_password" is a required field`
            }),
    });

    const { error } = schema.validate(req.body);

    if(error) {
        return res.status(400).send(error.message);
    }
    next();

};

//create posts validation
exports.createPostValidator = (req, res, next) => {

    const schema = Joi.object({
        title: Joi.string()
            .min(3)
            .required()
            .messages({
                'string.base': `"title" should be a type of 'text'`,
                'string.empty': `"title" cannot be an empty field`,
                'any.required': `"title" is required field`,
                'string.min': `"title" should have a minimum length of {#limit}`
            }),
        body: Joi.string()
            .min(10)
            .required()
            .messages({
                'string.base': `"body" should be a type of 'text'`,
                'string.empty': `"body" cannot be an empty field`,
                'any.required': `"body" is required field`,
                'string.min': `"body" should have a minimum length of {#limit}`
            }),
    });

    const { error } = schema.validate(req.body);

    if(error) {
        return res.status(400).send(error.message);
    }
    next();

};

// //login validation
// exports.loginValidator = (req, res, next) => {
//
//     const schema = Joi.object({
//         email: Joi.string()
//             .min(4)
//             .required()
//             .email()
//             .messages({
//                 'string.base': `"email" should be a type of 'text'`,
//                 'string.empty': `"email" cannot be an empty field`,
//                 'string.min': `"email" should have a minimum length of {#limit}`,
//                 'any.required': `"email" is a required field`,
//                 'any.email': `"email" must be correct email`
//             }),
//         password: Joi.string()
//             .min(6)
//             .required()
//             .messages({
//                 'string.empty': `"password" cannot be an empty field`,
//                 'string.min': `"password" should have a minimum length of {#limit}`,
//                 'any.required': `"password" is a required field`
//             }),
//     });
//
//     const { error } = schema.validate(req.body);
//
//     if(error) {
//         return res.status(400).send(error.message);
//     }
//     next();
// };


