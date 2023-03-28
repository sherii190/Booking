const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 50
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 50
  },
  userName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  resetToken: {
    type: String
  },
  admin: Boolean,
  type: {
    type: String,
    enum: ['Admin', 'Cleaner', 'Customer'],
    required: true
  }
});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    firstName: Joi.string().min(2).max(50),
    lastName: Joi.string().min(2).max(50),
    userName: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    type: Joi.string().required()
  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;