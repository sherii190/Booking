const jwt = require('jsonwebtoken');
const config = require('config');
const { User } = require('../models/user');

module.exports = async (req, res, next) => {
  const token = req.header('apikey');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = await User.findById(decoded._id);
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}