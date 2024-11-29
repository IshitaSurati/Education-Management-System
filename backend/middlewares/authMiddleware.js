const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Adjust according to your model

// Authentication middleware to verify the token
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // Save user data in the request for later use
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Authorization middleware to restrict access based on role
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
    }
    next();
  };
};

module.exports = { authenticate, authorizeRole };
