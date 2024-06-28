const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// POST route to save quiz data
router.post('/save-quiz', quizController.saveQuiz);

// GET route to fetch quiz data by quiz ID
router.get('/get-quiz/:quizId', quizController.getQuiz);

// GET route to fetch quizzes by companyId
router.get('/get-quizzes-by-company', quizController.getQuizzesByCompanyId);

module.exports = router;
