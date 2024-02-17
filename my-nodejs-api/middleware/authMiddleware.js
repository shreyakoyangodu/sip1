const bcrypt = require('bcrypt');
const User = require('../models/User'); // Assuming you have a User model defined

const authenticate = async (req, res, next) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // If authentication successful, attach the user object to the request for further use
    req.user = user;

    // Call next() to proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = authenticate;
