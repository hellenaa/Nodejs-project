const router = require('express').Router();
//model
const { allUsers, getUser, hasAuthorized, userById } = require('../controllers/users');
//jwt express
const { requireLogin } = require('../middleware/requireLogin');



router.get('/users', allUsers );
router.get('/user/:userId', requireLogin, getUser );


router.param("userId", userById);

module.exports = router;