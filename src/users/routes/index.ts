const Router = require('express').Router;
const usersController = require('../controllers/usersController')
const authMiddleware = require('../../middlewares/auth-middleware');
const router = new Router();
router.get('/logout', usersController.logout)  //i think this way is better
router.post('/signup', usersController.signup)
router.post('/signin', usersController.signin)
router.post('/signin/new_token', usersController.signinNewToken)
router.get('/info', authMiddleware, usersController.getMyInfo)

module.exports = router;