/*const verify = require('../middleware/verifyToken');*/
const router = require('express').Router();  //router
//controllers
const { getPosts, createPost, postsByUser } = require('../controllers/posts');
const { userById, hasAuthorized } = require('../controllers/users');
const { requireLogin } = require('../middleware/requireLogin'); //middleware
const validator = require('../middleware/validation'); //validation
const { upload } = require('../middleware/formHandler'); //form handler


router.post('/post/new/:userId', requireLogin, hasAuthorized, upload, createPost);
router.get('/posts/by/:userId', postsByUser);
router.get('/posts', getPosts);

router.param("userId", userById);

module.exports = router;
