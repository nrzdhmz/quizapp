const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  companyName: { type: String, required: true }, // Store company name directly
  link: { type: String, required: true },
  questions: [{
    text: { type: String, required: true },
    answers: [{ type: String, required: true }],
    correctAnswerIndex: { type: Number, required: true }
  }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User model
});

module.exports = mongoose.model('Quiz', quizSchema);
