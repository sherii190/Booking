const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const { sendEmailForgotPassword } = require("../utils/email/sendEmail");
const router = express.Router();
const chance = require('chance')();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  // if email is already registered, send error message
  //if (user) return res.status(400).send("Email already registered.");


  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  console.log(user);
  res.send({ token, user: _.pick(user, ["_id", "userName", "email", "type"]) });
});

router.post("/forgot-password", async (req, res) => {
  const { error } = validateForgotPassword(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  user.resetToken = chance.guid();
  await user.save();
  let link = `${process.env.APP_URL || 'http://localhost:3001'}/reset-password?email=${user.email}&token=${user.resetToken}`
  sendEmailForgotPassword(user.email, user.firstName, link, "Click: Forgot password?", (message) => {
    res.send({
      message: `Password reset link is sent to your email address`
    })
  }, err => {
    console.log(err);
    return res.status(400).send("Error sending email");
  })

});


router.post("/reset-password", async (req, res) => {
  const { error } = validateResetPassword(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email, resetToken: req.body.token });
  if (!user) return res.status(400).send("Invalid email or token.");


  user.resetToken = null;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();

  res.send({
    message: `Password has been reset`
  })

});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}

function validateResetPassword(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    token: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}


function validateForgotPassword(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
