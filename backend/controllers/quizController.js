const Quiz = require('../models/quiz');

// Save quiz to database
exports.saveQuiz = async (req, res) => {
  try {
    const { title, companyId, link, questions, createdBy } = req.body;

    // Create new quiz
    const newQuiz = new Quiz({
      title,
      companyId,
      link,
      questions,
      createdBy
    });

    // Save quiz to database
    await newQuiz.save();

    res.status(201).json({ message: 'Quiz saved successfully', quiz: newQuiz });
  } catch (error) {
    console.error('Error saving quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch quiz by ID
exports.getQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    // Fetch quiz by ID
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.status(200).json({ quiz });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch quizzes by companyId
exports.getQuizzesByCompanyId = async (req, res) => {
  try {
    const { companyId } = req.query;

    // Fetch quizzes by companyId
    const quizzes = await Quiz.find({ companyId });
    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes by companyId:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};
