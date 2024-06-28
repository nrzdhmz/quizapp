const express = require('express');
const { saveQuiz } = require('../controllers/quizController');

const router = express.Router();

router.post('/save-quiz', saveQuiz);

module.exports = router;
