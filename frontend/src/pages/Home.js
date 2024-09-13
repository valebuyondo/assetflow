import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; // External CSS for better organization

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to AssetFlow</h1>
          <p>Manage your assets seamlessly with our powerful platform.</p>
          <div className="hero-buttons">
            <Link to="/assets" className="btn btn-primary">
              View Assets
            </Link>
            <Link to="/add-asset" className="btn btn-secondary">
              Add Asset
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="introduction">
        <h2>What is AssetFlow?</h2>
        <p>
          AssetFlow is an asset management system that helps you keep track of your valuable assets, monitor depreciation, and streamline asset management processes. Whether you're managing physical or digital assets, AssetFlow provides you with the tools to keep everything organized and secure.
        </p>
      </section>

      {/* Key Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>Real-time Asset Tracking</h3>
            <p>Track all your assets in real time and manage them with ease.</p>
          </div>
          <div className="feature-item">
            <h3>Depreciation Calculator</h3>
            <p>Automatically calculate asset depreciation over time to keep your records accurate.</p>
          </div>
          <div className="feature-item">
            <h3>Secure and Accessible</h3>
            <p>All your asset data is stored securely and is accessible from anywhere at any time.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="call-to-action">
        <h2>Ready to Manage Your Assets?</h2>
        <Link to="/login" className="btn btn-primary">
          Get Started Now
        </Link>
      </section>
    </div>
  );
};

export default Home;
