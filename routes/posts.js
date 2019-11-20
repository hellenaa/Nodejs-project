/*const verify = require('../middleware/verifyToken');*/
const router = require('express').Router();  //router
//controllers
const { getPosts, createPost, postsByUser } = require('../controllers/posts');
const { userById, hasAuthorized } = require('../controllers/users');
//middleware
const { requireLogin } = require('../middleware/requireLogin');
const validator = require('../middleware/validation'); //validation




router.post('/post/new/:userId', requireLogin, hasAuthorized, validator.createPostValidator, createPost);
router.get('/posts/by/:userId', postsByUser);
router.get('/posts', getPosts);

router.param("userId", userById);

module.exports = router;
