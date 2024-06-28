import React from 'react';
import logo from '../assets/images/Logo.svg';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Header = () => {
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className='header'>
      <div className="headerContainer">
        <div className="logo">
          <Link to='/'>
            <img src={logo} alt="nexuslogo" />
          </Link>
        </div>
        <nav>
          <ul>
            {user && (
              <li>
                <Link to='/attemptquizes'>
                  Quizzes
                </Link>
              </li>
            )}
            {user?.role === 'employer' && (
              <li>
                <Link to='/makequiz'>
                  Create a Quiz
                </Link>
              </li>
            )}
            {user ? (
              <li>
                <Link onClick={handleLogout}>
                  Log out
                </Link>
              </li>
            ) : (
              <li>
                <Link to='/login'>
                  Log in
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
