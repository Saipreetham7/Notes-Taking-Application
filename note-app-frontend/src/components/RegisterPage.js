import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/RegisterPage.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('/api/users/register', { username, password });
      navigate('/login');
    } catch (error) {
      console.error('Error registering');
    }
  };

  return (
    // <div>
    //   <h1>Register</h1>
    //   <input
    //     type="text"
    //     value={username}
    //     onChange={(e) => setUsername(e.target.value)}
    //     placeholder="Username"
    //   />
    //   <input
    //     type="password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     placeholder="Password"
    //   />
    //   <button onClick={handleRegister}>Register</button>
    // </div>
    <div className="container">
      <h1>Register</h1>
      <input
        className="input-field"
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input-field"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="register-button" onClick={handleRegister}>
        Register
      </button>
      <p className="terms-conditions">
        <input type="checkbox" /> I agree to the{' '}
        <a href="/terms">Terms and Conditions</a>.
      </p>
      <p className="login-link">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default RegisterPage;
