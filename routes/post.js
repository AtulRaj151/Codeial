const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/post_controller');

router.post('/create',passport.checkAuthenticated,postController.create);
router.get('/destroy/:id',passport.checkAuthenticated,postController.destroy);

module.exports = router;