const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/user_controller');

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
module.exports = router;