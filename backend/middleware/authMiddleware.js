const jwt = require('jsonwebtoken');
const User = require('../models/User');
const logger = require('../utils/logger');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      logger.error(`Auth Middleware Error: ${error.message}`);
      return res.status(401).json({ message: 'Not Authorized' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No Token, Authorization Denied' });
  }
};

module.exports = protect;
