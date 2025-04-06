const mongoose = require('mongoose');
const Joi = require('joi');
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      minlength: 5,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
      minlength: 5,
      unique: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
// User Model
const User = mongoose.model('User', userSchema);
// Validate Register
function validateRegisterUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().max(100).min(5).trim().email(),
    username: Joi.string().trim().min(3).max(100).required(),
    password: Joi.string().min(6).required().trim(),
    isAdmin: Joi.bool(),
  });
  return schema.validate(obj);
}
// Validate Login
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().max(100).min(5).trim().email(),
    password: Joi.string().min(6).required().trim(),
  });
  return schema.validate(obj);
}
// Validate Update
function validateUpdateUser(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().max(100).min(5).trim().email(),
    username: Joi.string().trim().min(3).max(100),
    password: Joi.string().min(6).trim(),
    isAdmin: Joi.bool(),
  });
  return schema.validate(obj);
}
module.exports = {
  User,
  validateLoginUser,
  validateRegisterUser,
  validateUpdateUser,
};
