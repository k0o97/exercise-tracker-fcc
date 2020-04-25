const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/new-user', userController.postNewUser);

router.get('/users', userController.getUsers);

module.exports = router;