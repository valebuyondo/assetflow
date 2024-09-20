import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Assets from './pages/Assets';
import AssetDetail from './components/AssetDetail';
import AddAsset from './components/AddAsset';
import Login from './components/Login';
import Register from './components/Register';
// import About from './pages/About';
import NotFound from './pages/NotFound';
// import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';  // Import Dashboard
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateAsset from './components/UpdateAsset';  // Import the UpdateAsset component
import Logout from './components/Logout';
import PrivateRoute from './components/PrivateRoute';  // Import PrivateRoute


function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Login />} />  {/* Redirects to Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/about" element={<About />} /> */}

        <Route path="/assets/:id" element={<PrivateRoute><AssetDetail /></PrivateRoute>} />
        <Route path="/add-asset" element={<PrivateRoute><AddAsset /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/assets/update/:id" element={<PrivateRoute><UpdateAsset /></PrivateRoute>} />  
        <Route path="/logout" element={<PrivateRoute><Logout /></PrivateRoute>} />  {/* Add logout route */}
        <Route path="/assets" element={<PrivateRoute><Assets /></PrivateRoute>}/></Routes>
    </Router>
  );
}

export default App;
