import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Assets from './pages/Assets';
import AssetDetail from './components/AssetDetail';
import AddAsset from './components/AddAsset';
import Login from './components/Login';
// import About from './pages/About';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

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
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
