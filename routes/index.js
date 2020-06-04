const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');


router.get('/',homeController.home);
router.use('/user',require('./users'));
router.use('/posts',require('./post'));
router.use('/comment',require('./comment'));

console.log("router loaded");

module.exports = router;
