import axios from 'axios';

// Base API URL based on environment (configured in .env file)
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to handle errors
const handleError = (error) => {
  if (error.response) {
    // Server responded with a status other than 2xx
    throw new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    // No response from server
    throw new Error('No response from server. Please try again.');
  } else {
    // Other errors (e.g., network issue)
    throw new Error(error.message || 'An unexpected error occurred');
  }
};

// Register a new user
export const register = async (userData) => {
  console.log('Sending Data:', userData);  // Log the data being sent

  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.errors) {
      console.error('Validation Errors:', error.response.data.errors);  // Log backend validation errors
      throw new Error(error.response.data.errors[0].msg);
    } else {
      throw new Error('Registration failed');
    }
  }
};

// Login a user
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    // Store the JWT token if login is successful
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Fetch all assets
export const fetchAssets = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/assets`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Fetch a single asset by ID
export const fetchAsset = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/assets/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Add a new asset
export const addAsset = async (assetData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/assets`, assetData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Update an existing asset by ID
export const updateAsset = async (id, assetData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`${API_URL}/assets/${id}`, assetData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Delete an asset by ID
export const deleteAsset = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/assets/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
