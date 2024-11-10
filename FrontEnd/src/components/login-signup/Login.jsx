// Login.jsx
import React, { useState } from 'react';
import axios, { formToJSON } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authcontext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://expense-tracker-six-sandy-62.vercel.app/api/login/', formData);
      const { token } = response.data;
      localStorage.setItem('access_token',token)
      login()
      navigate('/home');
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        Username/Email:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username or email (test1)"
          required
        />
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password (test1)"
          required
        />
        <button type="submit">Login</button>
        <br />
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
