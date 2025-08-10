const express = require('express');
const { body } = require('express-validator');
const { authenticateUser } = require('../middleware/auth.middleware');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  logout,
  getCurrentUser
} = require('../controllers/userController');

const router = express.Router();

// Validation middleware
const signupValidation = [
  body('firstname').trim().isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
  body('lastname').trim().isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidation = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

const forgotPasswordValidation = [
  body('email').isEmail().withMessage('Please enter a valid email')
];

const resetPasswordValidation = [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('otp').isLength({ min: 5, max: 5 }).withMessage('OTP must be 5 digits'),
  body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

// Public routes
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.post('/forgot-password', forgotPasswordValidation, forgotPassword);
router.post('/reset-password', resetPasswordValidation, resetPassword);

// Private routes
router.post('/logout', authenticateUser, logout);
router.get('/me', authenticateUser, getCurrentUser);

module.exports = router;
