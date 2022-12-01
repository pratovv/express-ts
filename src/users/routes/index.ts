const Router = require('express').Router;
const usersController = require('../controllers/usersController')
const authMiddleware = require('../../middlewares/auth-middleware');
const userRouter = new Router();
userRouter.get('/logout', usersController.logout)  //i think this way is better
userRouter.post('/signup', usersController.signup)
userRouter.post('/signin', usersController.signin)
userRouter.post('/signin/new_token', usersController.signinNewToken)
userRouter.get('/info', authMiddleware, usersController.getMyInfo)

module.exports = userRouter;