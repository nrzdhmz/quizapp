import React, { useState } from 'react';
import axios from 'axios';

const RegisterCompany = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyPassword, setCompanyPassword] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/create-company', {
        companyName,
        companyPassword
      });

      if (response.status === 201) {
        console.log('Company created successfully');
        setCompanyCode(response.data.companyCode);
      } else {
        console.error('Company creation failed');
        setError('Company creation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error creating company:', error);
      setError('Error creating company. Please try again.');
    }
  };

  return (
    <main>
      <section className="loginPage">
        <div className="loginBox">
          <h2>Create Company</h2>
          <form onSubmit={handleSubmit}>
            <div className="authGroup">
              <input
                type="text"
                id="companyName"
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="authGroup">
              <input
                type="password"
                id="companyPassword"
                placeholder="Enter company password"
                value={companyPassword}
                onChange={(e) => setCompanyPassword(e.target.value)}
                required
              />
            </div>
            <button className="authBtn" type="submit">Create Company</button>
            {error && <p className="error">{error}</p>}
            {companyCode && <p>Company Code: {companyCode}</p>}
          </form>
        </div>
      </section>
    </main>
  );
};

export default RegisterCompany;
