import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const RegisterEmployer = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/register-employer', {
        username,
        email,
        password,
        companyCode
      });

      if (response.status === 201) {
        console.log('Employer registration successful');
        setUser(response.data.user); // Set user data in context
        navigate('/');
      } else {
        console.error('Employer registration failed');
        setError('Employer registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error registering employer:', error);
      setError('Error registering employer. Please try again.');
    }
  };

  return (
    <main>
      <section className="loginPage">
        <div className="loginBox">
          <h2>Register Employer</h2>
          <form onSubmit={handleSubmit}>
            <div className="authGroup">
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="authGroup">
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="authGroup">
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="authGroup">
              <input
                type="text"
                id="companyCode"
                placeholder="Enter your company code"
                value={companyCode}
                onChange={(e) => setCompanyCode(e.target.value)}
                required
              />
            </div>
            <button className="authBtn" type="submit">Register Employer</button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </section>
    </main>
  );
};

export default RegisterEmployer;
