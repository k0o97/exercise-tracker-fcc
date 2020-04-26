const express = require('express');
const exerciseController = require('../controllers/exercise.controller');
const checkDayMiddleware = require('../middleware');

const router = express.Router();

router.post('/add', checkDayMiddleware.checkDay, exerciseController.postAdd);
router.get('/log', exerciseController.getLog);

module.exports = router;