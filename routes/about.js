const router = require('express').Router();
const { userById } = require('../controllers/users');
//jwt express
const { requireLogin } = require('../middleware/requireLogin');
const { getAbout } = require('../controllers/about');


router.get('/about', getAbout );

router.param("userId", userById);

module.exports = router;