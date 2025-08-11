const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  // Check for token in Authorization header first (Bearer token)
  let token = req.headers.authorization;
  
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7); // Remove 'Bearer ' prefix
  } else {
    // Fallback to cookie token
    token = req.cookies?.usertoken;
  }

  if (!token) {
    return res.status(401).json({ message: 'User not authorized. No token found.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'User not authorized. Invalid token.' });
  }
};

module.exports = {
  authenticateUser
};
