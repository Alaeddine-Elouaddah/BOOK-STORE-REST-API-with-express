const express = require('express');
const router = express.Router();
const {
  getForgotPassword,
  sendForgotPasswordLink,
  getResetPasswordView,
  resetThePassword,
} = require('../controllers/passwordController');
router
  .route('/forgot-password')
  .get(getForgotPassword)
  .post(sendForgotPasswordLink);
// password / reset password:
router
  .route('/password/reset-password/:userId/:token')
  .get(getResetPasswordView)
  .post(resetThePassword);

module.exports = router;
