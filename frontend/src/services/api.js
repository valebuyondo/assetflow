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
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;  // Return success response
  } catch (error) {
    if (error.response && error.response.data.errors) {
      // Return the first validation error message
      throw new Error(error.response.data.errors[0].msg);
    } else if (error.response && error.response.data.msg) {
      // Handle user exists or other backend custom errors
      throw new Error(error.response.data.msg);
    } else {
      throw new Error('Registration failed');
    }
  }}


export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    console.log('Login Response:', response.data);  // Log the response to check the token
    localStorage.setItem('token', response.data.token);  // Store the JWT token
    localStorage.setItem('role', response.data.role);  // Store the user's role (if it's returned)
    return response.data;
  } catch (error) {
    if (error.response && error.response.data.msg) {
      throw new Error(error.response.data.msg);
    } else {
      throw new Error('Login failed');
    }
  }
};


export const fetchAssets = async () => {
  try {
    const token = localStorage.getItem('token');  // Retrieve the JWT token
    const response = await axios.get(`${API_URL}/assets`, {
      headers: {
        'Authorization': `Bearer ${token}`  // Include token in headers
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching assets:', error.message);
    throw new Error('Failed to fetch assets');
  }
};


// // Fetch a single asset by ID
// export const fetchAsset = async (id) => {
//   try {
//     const token = localStorage.getItem('token');
//     const response = await axios.get(`${API_URL}/assets/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
//   } catch (error) {
//     handleError(error);
//   }
// };

// Add a new asset
export const addAsset = async (assetData) => {
  try {
    const token = localStorage.getItem('token');  // Retrieve JWT token
    const response = await axios.post(`${API_URL}/assets`, assetData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  // Include JWT token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding asset:', error.message);  // Log the error
    throw new Error('Failed to add asset');
  }
};

// Update an existing asset by ID
// export const updateAsset = async (id, assetData) => {
//   try {
//     const token = localStorage.getItem('token');
//     const response = await axios.patch(`${API_URL}/assets/${id}`, assetData, {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     handleError(error);
//   }
// };

// Fetch maintenance logs for an asset
export const fetchMaintenanceLogs = async (assetId) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/assets/${assetId}/maintenance`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Add a maintenance log
export const addMaintenanceLog = async (assetId, logData) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/assets/${assetId}/maintenance`, logData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const fetchDashboardStats = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/dashboard/stats`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteAsset = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/assets/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const fetchAsset = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/assets/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateAsset = async (id, assetData) => {
  const token = localStorage.getItem('token');
  const response = await axios.patch(`${API_URL}/assets/${id}`, assetData, {
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  return response.data;
};
