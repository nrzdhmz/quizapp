import React, { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const MakeQuizPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [questions, setQuestions] = useState([]);
  const { user } = useUser();

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', answers: [''], correctAnswerIndex: null }]);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].text = value;
    setQuestions(newQuestions);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleAddAnswer = (questionIndex) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].answers.length < 6) {
      newQuestions[questionIndex].answers.push('');
      setQuestions(newQuestions);
    }
  };

  const handleDeleteAnswer = (questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = value;
    setQuestions(newQuestions);
  };

  const handleSelectCorrectAnswer = (questionIndex, answerIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctAnswerIndex = answerIndex;
    setQuestions(newQuestions);
  };

  const handleSaveQuiz = async () => {
    if (title.trim() === '') {
      alert('Please enter a title for the quiz.');
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      if (
        questions[i].text.trim() === '' ||
        questions[i].answers.some((answer) => answer.trim() === '') ||
        questions[i].correctAnswerIndex === null
      ) {
        alert('Please fill in all fields and select the correct answer for each question before saving.');
        return;
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/quiz/save-quiz', {
        title,
        link,
        questions,
        companyId: user.companyId, // Pass user's companyId
        createdBy: user._id,
      });

      if (response.status === 201) {
        alert('Quiz saved successfully');
        navigate('/');
      } else {
        alert('Failed to save quiz');
      }
    } catch (error) {
      alert('Failed to save quiz');
      console.error('Error:', error);
    }
  };

  return (
    <main>
      <section className="makeQuiz">
        <div className="container">
          <form>
            <div className="formGroup">
              <input
                type="text"
                id="title"
                className="makeQuizInput"
                placeholder="Enter quiz title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="formGroup">
              <input
                type="text"
                id="link"
                className="makeQuizInput"
                placeholder="Enter your Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>
            <div className="questions">
              {questions.map((question, qIndex) => (
                <div key={qIndex} className="questionsGroup">
                  <div className="formGroup question">
                    <input
                      type="text"
                      value={question.text}
                      onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                      placeholder="Enter your question"
                      className="makeQuizInput"
                    />
                    <button
                      type="button"
                      className="deleteAnswerBtn"
                      onClick={() => handleDeleteQuestion(qIndex)}
                    >
                      <RiDeleteBin6Line className="icon" />
                    </button>
                  </div>
                  {question.answers.map((answer, aIndex) => (
                    <div key={aIndex} className="formGroup">
                      <input
                        type="text"
                        value={answer}
                        onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                        placeholder="Enter your answer"
                        className="makeQuizInput"
                      />
                      <button
                        type="button"
                        className="deleteAnswerBtn"
                        onClick={() => handleDeleteAnswer(qIndex, aIndex)}
                      >
                        <RiDeleteBin6Line className="icon" />
                      </button>
                      <input
                        type="radio"
                        name={`correctAnswer${qIndex}`}
                        checked={question.correctAnswerIndex === aIndex}
                        onChange={() => handleSelectCorrectAnswer(qIndex, aIndex)}
                      />
                    </div>
                  ))}
                  {question.answers.length < 6 && (
                    <button
                      type="button"
                      className="createQuestionBtn"
                      onClick={() => handleAddAnswer(qIndex)}
                    >
                      Add Answer
                      <GoPlus className="icon" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              className="createQuestionBtn"
              onClick={handleAddQuestion}
            >
              Create a Question
              <GoPlus className="icon" />
            </button>
            <button
              type="button"
              className="createQuestionBtn"
              onClick={handleSaveQuiz}
            >
              Save Quiz
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default MakeQuizPage;
