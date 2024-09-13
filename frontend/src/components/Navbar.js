import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={navStyles}>
    <Link to="/" style={linkStyles}>Home</Link>
    <Link to="/assets" style={linkStyles}>Assets</Link>
    <Link to="/add-asset" style={linkStyles}>Add Asset</Link>
    <Link to="/login" style={linkStyles}>Login</Link>
    {/* <Link to="/about" style={linkStyles}>About Us</Link> */}
  </nav>
);

const navStyles = {
  background: '#444',
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
  gap: '15px'
};

const linkStyles = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: 'bold',
};

export default Navbar;
