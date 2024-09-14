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
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';  // Import Dashboard

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/assets/:id" element={<AssetDetail />} />
        <Route path="/add-asset" element={<AddAsset />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />  {/* Register route */}
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
