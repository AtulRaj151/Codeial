const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentController = require('../controllers/comment_controller');

router.post('/create',passport.checkAuthenticated,commentController.create);
router.get('/destroy/:id',passport.checkAuthenticated,commentController.destroy);

module.exports = router;