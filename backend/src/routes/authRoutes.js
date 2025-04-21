const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser } = require('../controllers/authController');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const mongoose = require('mongoose');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', auth, getCurrentUser);

// Test route to check MongoDB connection
router.get('/test', async (req, res) => {
  try {
    // Try to connect to MongoDB
    const status = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({ 
      message: 'Backend is running',
      mongodb: status,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error checking MongoDB connection',
      error: error.message 
    });
  }
});

module.exports = router; 