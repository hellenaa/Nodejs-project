const router = require('express').Router();
const validator = require('../middleware/validation'); //validation
const { registerUser, loginUser, logoutUser } = require('../controllers/auth');
const { userById } = require('../controllers/users');



router.post('/register', validator.registerValidator, registerUser);
router.post('/login',/* validator.loginValidator,*/ loginUser);
router.get('/logout', logoutUser);

router.param("userId", userById);

module.exports = router;