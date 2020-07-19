const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');
const { route } = require('./api');

router.get('/profile/:id',passport.checkAuthenticated,userController.profile);
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);
router.post('/create',userController.create);
router.post('/update/:id',userController.update);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/sign-in'}
),userController.createSession);

router.get('/sign-out',userController.destroySession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/user/sign-in'}),userController.createSession);
module.exports = router;