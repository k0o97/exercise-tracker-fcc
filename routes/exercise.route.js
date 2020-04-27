const express = require('express');
const exerciseController = require('../controllers/exercise.controller');

const router = express.Router();

router.post('/add', exerciseController.postAdd);
router.get('/log', exerciseController.getLog);

module.exports = router;