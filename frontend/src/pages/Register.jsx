import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const Register = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userData = {
        username,
        email,
        password,
        role,
        companyName
      };

      const response = await axios.post('http://localhost:5000/auth/register', userData);

      if (response.status === 201) {
        console.log('Registration successful');
        setUser(response.data.user);
        navigate('/');
      } else {
        console.error('Registration failed');
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Error registering user. Please try again.');
    }
  };

  return (
    <main>
      <section className="loginPage">
        <div className="loginBox">
          <h2>Register as {role}</h2>
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
            {role === 'employer' && (
              <div className="authGroup">
                <input
                  type="text"
                  id="companyName"
                  placeholder="Enter your company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
            )}
            <button className="authBtn" type="submit">Register</button>
            {error && <p className="error">{error}</p>}
            <div className="additional">
              <p>Already have an account? <Link to='/login'> Log in</Link></p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Register;
