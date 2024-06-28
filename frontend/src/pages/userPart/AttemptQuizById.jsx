import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoPlayer from '../../components/userPart/AttempQuiz/VideoPlayer';  // Adjust the path as per your actual folder structure
import QuestionList from '../../components/userPart/AttempQuiz/QuestionList'; // Adjust the path as per your actual folder structure
import StartQuizButton from '../../components/userPart/AttempQuiz/StartQuizButton'; // Adjust the path as per your actual folder structure
import { useParams } from 'react-router-dom'; // Import useParams to get quizId from URL parameters

const AttemptQuizById = () => {
  const { quizId } = useParams(); // Get quizId from URL params
  const [quizData, setQuizData] = useState(null);
  const [showQuestions, setShowQuestions] = useState(false);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        // Fetch quiz data using quizId from URL params
        const response = await axios.get(`http://localhost:5000/quiz/get-quiz/${quizId}`);
        setQuizData(response.data.quiz); // Assuming response contains quiz data
      } catch (error) {
        console.error('Failed to fetch quiz data:', error);
      }
    };

    fetchQuizData();
  }, [quizId]); // Fetch data whenever quizId changes

  if (!quizData) {
    return <div>Loading quiz data...</div>;
  }

  const { link, questions } = quizData;

  const handleStartQuiz = () => {
    setShowQuestions(true);
  };

  return (
    <main>
      <section className='attemptQuiz'>
        <div className='container'>
          {!showQuestions ? (
            <VideoPlayer url={link} />
          ) : (
            <QuestionList questions={questions} />
          )}
          {!showQuestions && (
            <StartQuizButton onClick={handleStartQuiz} />
          )}
        </div>
      </section>
    </main>
  );
};

export default AttemptQuizById;
