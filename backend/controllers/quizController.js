const Quiz = require('../models/Quiz');

exports.saveQuiz = async (req, res) => {
  const { title, link, questions, companyName, createdBy } = req.body;

  try {
    const quiz = new Quiz({ title, link, questions, companyName, createdBy });
    await quiz.save();
    res.status(201).json({ message: 'Quiz saved successfully', quiz });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save quiz' });
  }
};
