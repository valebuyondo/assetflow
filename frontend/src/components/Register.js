import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api'; // API function for registration
import './styles/Register.css';  // Assuming you have an existing CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''  // Only used for client-side validation
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);  // Track success message
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Frontend validation: Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Prepare data to send to the backend (excluding confirmPassword)
    const { username, email, password } = formData;
    const userData = { username, email, password };

    try {
      // Call the register API
      await register(userData);

      // On success, show success message and redirect after 2 seconds
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');  // Redirect to the login page after success
      }, 2000);
    } catch (err) {
      // Handle error messages
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      
      {/* Popups for success and error */}
      {success && <div className="popup success-popup">{success}</div>}
      {error && <div className="popup error-popup">{error}</div>}

      <form onSubmit={handleSubmit} className="register-form">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn">Register</button>
      </form>
    </div>
  );
};

export default Register;
