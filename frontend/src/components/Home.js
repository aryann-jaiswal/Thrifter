import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Thrifter</h1>
        <p className="tagline">Your one-stop marketplace for second-hand treasures</p>
        
        <div className="cta-buttons">
          <button 
            className="cta-button browse"
            onClick={() => navigate('/items')}
          >
            Browse Items
          </button>
          {!token && (
            <button 
              className="cta-button sell"
              onClick={() => navigate('/register')}
            >
              Start Selling
            </button>
          )}
        </div>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <h3>Find Great Deals</h3>
          <p>Discover pre-loved items at amazing prices</p>
        </div>
        <div className="feature-card">
          <h3>Easy to Sell</h3>
          <p>List your items in minutes with our simple process</p>
        </div>
        <div className="feature-card">
          <h3>Local Community</h3>
          <p>Connect with buyers and sellers in your area</p>
        </div>
      </div>
    </div>
  );
};

export default Home; 