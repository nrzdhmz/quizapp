import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context/UserContext'; // Import useUser hook

const LoginPage = () => {
  const { setUser } = useUser(); // Destructure setUser from useUser
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password
      });

      if (response.status === 200) {
        console.log('Login successful');
        console.log('User data:', response.data.user); // Log user data received from backend

        setUser(response.data.user); // Set user data in context and local storage
        localStorage.setItem('token', response.data.token); // Store the token in local storage if needed
        navigate('/');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      // Handle error appropriately
    }
  };

  return (
    <main>
      <section className="loginPage">
        <div className="loginBox">
          <h2>Login</h2>
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
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="authBtn" type="submit">Login</button>
            <div className="additional">
              <p>Forgot <Link to="#">Password</Link>?</p>
              <p>Don't have an account?</p>
              <p>Sign up as 
                <Link to='/register/employee'> employee </Link>
                or as 
                <Link to='/register/employer'> employer</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
