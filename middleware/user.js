const jwt = require('jsonwebtoken');
const config = require('config');

const jwtPrivateKey = process.env.JWT_PRIVATE_KEY || config.get('jwtPrivateKey');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (ex) {
    next();
  }
}