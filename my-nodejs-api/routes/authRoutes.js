const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Login endpoint with validation and authentication logic
router.post('/login', [
  // Validate email
  body('email').isEmail().withMessage('Invalid email'),
  // Validate password
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Extract email and password from request body
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Authentication successful, return success message
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Register endpoint with validation
router.post('/register', [
  // Validate name
  body('name').notEmpty().withMessage('Name is required'),
  // Validate email
  body('email').isEmail().withMessage('Invalid email'),
  // Validate password
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], (req, res) => {
  // Handle registration logic here
});

module.exports = router;
