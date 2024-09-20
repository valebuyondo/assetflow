import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';  // External CSS for better organization

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to AssetFlow</h1>
          <p>Manage your assets seamlessly with our powerful platform.</p>
          {/* <div className="hero-buttons">
            <Link to="/assets" className="btn btn-primary">
              View Assets
            </Link>
            <Link to="/add-asset" className="btn btn-secondary">
              Add Asset
            </Link>
          </div> */}
        </div>
      </section>

      {/* Introduction Section */}
      <section className="introduction">
        <h2>What is AssetFlow?</h2>
        <p>
          AssetFlow helps you keep track of your valuable assets, monitor depreciation, and streamline asset management.
        </p>
      </section>

      {/* Key Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="features-list">
          <div className="feature-item">
            <h3>Real-time Asset Tracking</h3>
            <p>Track all your assets in real time.</p>
          </div>
          <div className="feature-item">
            <h3>Depreciation Calculator</h3>
            <p>Automatically calculate asset depreciation.</p>
          </div>
          <div className="feature-item">
            <h3>Secure and Accessible</h3>
            <p>Your data is stored securely and accessible from anywhere.</p>
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
