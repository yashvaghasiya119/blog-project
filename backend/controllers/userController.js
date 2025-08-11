const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Generate OTP
const generateOTP = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

// @desc    User Signup
// @route   POST /api/user/signup
// @access  Public
const signup = async (req, res) => {
  try {
    console.log('Signup request received:', { body: req.body, headers: req.headers });
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password } = req.body;
    console.log('Processing signup for:', { firstname, lastname, email });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const user = new User({
      firstname,
      lastname,
      email,
      password
    });

    console.log('Saving new user...');
    await user.save();
    console.log('User saved successfully:', user._id);

    // Generate token
    const token = generateToken(user._id);
    console.log('Token generated for user:', user._id);

    // Set cookie
    res.cookie('usertoken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    const response = {
      message: 'User created successfully',
      token: token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      }
    };

    console.log('Sending signup response:', { userId: user._id, hasToken: !!token });
    res.status(201).json(response);
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    User Login
// @route   POST /api/user/login
// @access  Public
const login = async (req, res) => {
  try {
    console.log('Login request received:', { body: req.body, headers: req.headers });
    
    const { email, password } = req.body;
    console.log('Processing login for:', { email });

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for login:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('User found, checking password...');
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Password verified, generating token...');
    // Generate token
    const token = generateToken(user._id);
    console.log('Token generated for user:', user._id);

    // Set cookie
    res.cookie('usertoken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    const response = {
      message: 'Login successful',
      token: token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
      }
    };

    console.log('Sending login response:', { userId: user._id, hasToken: !!token });
    res.json(response);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Forgot Password
// @route   POST /api/user/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP
    const otp = generateOTP();
    user.otp = otp;
    await user.save();

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP',
      html: `
        <h2>Password Reset Request</h2>
        <p>Your OTP for password reset is: <strong>${otp}</strong></p>
        <p>This OTP will expire in 10 minutes.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Reset Password
// @route   POST /api/user/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email, otp });
    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP or email' });
    }

    // Update password and clear OTP
    user.password = newPassword;
    user.otp = null;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Logout
// @route   POST /api/user/logout
// @access  Private
const logout = async (req, res) => {
  try {
    res.clearCookie('usertoken');
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get Current User
// @route   GET /api/user/me
// @access  Private
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  logout,
  getCurrentUser
};
