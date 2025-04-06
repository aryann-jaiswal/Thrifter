import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const handleSellItem = () => {
    if (!token) {
      navigate('/login');
    } else {
      navigate('/create-item');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <RouterLink to="/" className="navbar-brand">
          Thrifter
        </RouterLink>
        
        <div className="navbar-links">
          <RouterLink to="/" className="navbar-link">
            Browse Items
          </RouterLink>
          <button onClick={handleSellItem} className="navbar-button sell-button">
            Sell Item
          </button>
          {token ? (
            <>
              <span className="user-name">Welcome, {user?.name}</span>
              <button onClick={handleLogout} className="navbar-button logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <RouterLink to="/login" className="navbar-button">
                Login
              </RouterLink>
              <RouterLink to="/register" className="navbar-button">
                Register
              </RouterLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 