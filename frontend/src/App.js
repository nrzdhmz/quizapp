import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/scss/index.scss';
import HomePage from './pages/HomePage';
import Header from './ui/Header';
import MakeQuizPage from './pages/adminPart/MakeQuizPage';
import AttemptQuizPage from './pages/userPart/AttemptQuizPage';
import AttemptQuizById from './pages/userPart/AttemptQuizById'; 
import LoginPage from './pages/LoginPage';
import RegisterCompany from './pages/RegisterCompany';
import RegisterEmployer from './pages/RegisterEmployer';
import RegisterEmployee from './pages/RegisterEmployee';
import { UserProvider } from './context/UserContext'; 

const App = () => {
  return (
    <Router>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/makequiz" element={<MakeQuizPage />} />
          <Route path="/attemptquizes" element={<AttemptQuizPage />} />
          <Route path="/attemptquiz/:quizId" element={<AttemptQuizById />} /> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register-company" element={<RegisterCompany />} />
          <Route path="/register-employer" element={<RegisterEmployer />} />
          <Route path="/register-employee" element={<RegisterEmployee />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
