const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.cookies?.usertoken;

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
