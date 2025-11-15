import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const API_URL = process.env.REACT_APP_API_URL || '';
      const endpoint = isRegister ? `${API_URL}/auth/register` : `${API_URL}/auth/login`;
      const data = isRegister 
        ? { name, email, password } 
        : { email, password };

      const response = await axios.post(endpoint, data);
      onLogin(response.data.user, response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>☕ Café Management</h1>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <p>
          {isRegister ? 'Have an account? ' : "Don't have an account? "}
          <button 
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
      <style>{`
        .login-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .login-box {
          background: white;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          width: 100%;
          max-width: 400px;
        }
        .login-box h1 {
          text-align: center;
          margin-bottom: 30px;
          color: #333;
        }
        .login-box input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 14px;
        }
        .login-box button {
          width: 100%;
          padding: 12px;
          background: #667eea;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          margin-top: 10px;
        }
        .login-box button:hover {
          background: #5568d3;
        }
        .error {
          color: red;
          margin: 10px 0;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Login;
