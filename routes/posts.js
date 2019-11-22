/*const verify = require('../middleware/verifyToken');*/
const router = require('express').Router();  //router
//controllers
const { getPosts, createPost, postsByUser } = require('../controllers/posts');
const { userById, hasAuthorized } = require('../controllers/users');
const { requireLogin } = require('../middleware/requireLogin'); //middleware
const validator = require('../middleware/validation'); //validation
const multer  = require('multer');  //module for form data treating
const crypto = require('crypto');  //generate random file names
const path = require('path');  //module for working with path , esp getting the extname



let upload = multer({
    storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
            let customFileName = crypto.randomBytes(18).toString('hex'); //generate random file name
            let fileExtension = path.extname(file.originalname); // get file extension from original file name
            cb(null, customFileName + fileExtension)
        }
    })
}).single('file');



router.post('/post/new/:userId', requireLogin, hasAuthorized, upload, validator.createPostValidator, createPost);

router.post('/post/new/:userId', requireLogin, hasAuthorized, validator.createPostValidator, createPost);

router.get('/posts/by/:userId', postsByUser);
router.get('/posts', getPosts);

router.param("userId", userById);

module.exports = router;
