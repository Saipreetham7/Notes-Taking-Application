import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/users/login', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/notes');
    } catch (error) {
      console.error('Error logging in');
    }
  };

  return (
    // <div>
    //   <h1>Login</h1>
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
    //   <button onClick={handleLogin}>Login</button>
    // </div>
    <div className="container">
      <h1>Login</h1>
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
      <button onClick={handleLogin} className="login-button">
        Login
      </button>
      <p className="forgot-password">Forgot Password?</p>
      <p className="register-link">
        Don't have an account? <a href="/register">Sign Up</a>
      </p>
    </div>
  );
}

export default LoginPage;
