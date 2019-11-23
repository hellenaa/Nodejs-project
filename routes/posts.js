/*const verify = require('../middleware/verifyToken');*/
const router = require('express').Router();  //router
//controllers
const { postById, isPoster, getPosts, createPost, postsByUser, updatePost, deletePost } = require('../controllers/posts');
const { userById, hasAuthorized } = require('../controllers/users');
const { requireLogin } = require('../middleware/requireLogin'); //middleware
const validator = require('../middleware/validation'); //validation
const { upload } = require('../middleware/formHandler'); //form handler


router.get('/posts/by/:userId', requireLogin, postsByUser);
router.post('/post/new/:userId', requireLogin, hasAuthorized, upload, validator.createPostValidator, createPost);
router.put('/post/:postId', requireLogin, isPoster, upload, validator.createPostValidator, updatePost);
router.delete('/post/:postId', requireLogin, isPoster, deletePost);
router.get('/posts', getPosts);

router.param("userId", userById);
router.param("postId", postById);

module.exports = router;
