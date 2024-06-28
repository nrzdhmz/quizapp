import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const AttemptQuizPage = () => {
  const { user, setUser } = useUser();
  const [companyId, setCompanyId] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState('');

  const handleEnrollCompany = async () => {
    try {
      const response = await axios.put('http://localhost:5000/auth/enroll-company', {
        userId: user._id,
        companyId
      });

      setUser(response.data.user);

      const quizzesResponse = await axios.get(`http://localhost:5000/quiz/get-quizzes-by-company?companyId=${companyId}`);
      setQuizzes(quizzesResponse.data);
    } catch (error) {
      console.error('Failed to enroll in company or fetch quizzes:', error);
      setError('Failed to enroll in company or fetch quizzes. Please try again.'); // Set error message
    }
  };

  return (
    <main>
      <section className='attemptQuiz'>
        <div className='container'>
          <h2>Enroll in Company and View Quizzes</h2>
          <div className='enrollBox'>
            <input
              type='text'
              placeholder='Enter Company ID'
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
            />
            <button className='enrollBtn' onClick={handleEnrollCompany}>
              Enroll
            </button>
          </div>
          {error && <p className="error">{error}</p>} {/* Display error message */}
          <ul className='quizBoxes'>
            {quizzes.map((quiz) => (
              <li className='quizBox' key={quiz._id}>
                <Link to={`/attemptquiz/${quiz._id}`}>{quiz.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default AttemptQuizPage;
