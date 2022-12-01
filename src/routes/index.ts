const Router = require('express').Router;
const usersController = require('../controllers/usersController')
const router = new Router();
router.get('/info', usersController.getMyInfo) //return user id
router.get('/logout', usersController.logout)   //generate new accessToken ,disable last token
router.post('/signin', usersController.signin)  //login by id and pass ,get bearer and refresh token
router.post('/signin/new_token', usersController.signinNewToken)  //update access by refresh token
router.post('/signup', usersController.signup)  //register user id=phoneNumber||email , pass + access+bearer token

module.exports = router;