import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api'; // Assuming you have this API set up
import './styles/Login.css'; // For external styling

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(formData);  // Call the login API
      navigate('/dashboard');  // Redirect after successful login
    } catch (err) {
      setError(err.message);  // Display error message
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <div className="error-popup">{error}</div>}  {/* Show error message */}

      <form onSubmit={handleSubmit} className="login-form">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
      <div className="login-links">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    </div>
  );
};

export default Login;