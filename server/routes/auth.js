import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }
    
    // Create new user
    const user = new User({
      name,
      email,
      password, // Will be hashed by pre-save hook
    });
    
    await user.save();
    
    // Don't return password in response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userResponse,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during registration',
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }
    
    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }
    
    // Save user ID in session
    req.session.userId = user._id;
    
    // Return user data (excluding password)
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
    };
    
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: userResponse,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during login',
    });
  }
});

// Logout user
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error logging out',
      });
    }
    
    res.clearCookie('connect.sid');
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  });
});

// Check if user is authenticated
router.get('/check', (req, res) => {
  if (req.session.userId) {
    return res.status(200).json({
      success: true,
      isAuthenticated: true,
    });
  } else {
    return res.status(200).json({
      success: true,
      isAuthenticated: false,
    });
  }
});

export default router;