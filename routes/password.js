const express = require('express');
const router = express.Router();
const {
  getForgotPasswordView, // Changed from getForgotPassword to getForgotPasswordView
  sendForgotPasswordLink, // This one is correct
  getResetPasswordView, // This one is correct
  resetThePassword, // This one is correct
} = require('../controllers/passwordController');

router
  .route('/forgot-password')
  .get(getForgotPasswordView) // Changed from getForgotPassword to getForgotPasswordView
  .post(sendForgotPasswordLink);

router
  .route('/password/reset-password/:userId/:token')
  .get(getResetPasswordView)
  .post(resetThePassword);

module.exports = router;
