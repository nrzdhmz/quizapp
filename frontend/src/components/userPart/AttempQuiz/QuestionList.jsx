import React, { useState } from 'react';

const QuestionList = ({ questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(questions.length).fill(null));
  const [quizSubmitted, setQuizSubmitted] = useState(false); 
  const handleAnswerSelect = (questionIndex, answerIndex) => {
    if (!quizSubmitted) {
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers[questionIndex] = answerIndex;
      setSelectedAnswers(newSelectedAnswers);
    }
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    const results = questions.map((question, index) => {
      const selectedAnswerIndex = selectedAnswers[index];
      const isCorrect = selectedAnswerIndex !== null && selectedAnswerIndex === question.correctAnswerIndex;
      if (isCorrect) {
        correctCount++;
      }
      return {
        ...question,
        selectedAnswerIndex,
        isCorrect
      };
    });

    console.log(results);

    setQuizSubmitted(true);
  };

  return (
    <div className='questionsAttempt'>
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className='question'>
          <p>{`${questionIndex + 1}. ${question.text}`}</p>
          <ul>
            {question.answers.map((answer, answerIndex) => (
              <li
                key={answerIndex}
                onClick={() => handleAnswerSelect(questionIndex, answerIndex)}
                className={
                  selectedAnswers[questionIndex] === answerIndex && !quizSubmitted
                    ? 'selectedAnswer'
                    : quizSubmitted && answerIndex === question.correctAnswerIndex
                    ? 'correctAnswer'
                    : quizSubmitted &&
                      selectedAnswers[questionIndex] !== question.correctAnswerIndex &&
                      selectedAnswers[questionIndex] === answerIndex
                    ? 'wrongAnswer'
                    : ''
                }
              >
                {`${String.fromCharCode(97 + answerIndex)}. ${answer}`}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className='navigationButtons'>
        {!quizSubmitted && ( 
          <button className='QuestionBtn' onClick={handleSubmitQuiz}>
            Finish Quiz
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionList;
