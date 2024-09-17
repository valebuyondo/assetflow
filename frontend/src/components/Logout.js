import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from localStorage to log the user out
    localStorage.removeItem('token');
    localStorage.removeItem('role');  // Clear any role information
    navigate('/login');  // Redirect to login page
  }, [navigate]);

  return null;  // No need to render anything
};

export default Logout;
