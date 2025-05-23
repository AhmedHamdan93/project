import express from 'express';
import User from '../models/User.js';

const router = express.Router();



router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }
    

    
    const user = new User({
      name,
      email,
      password,
    });
    
    await user.save();
    

    
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



router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    

    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }
    

    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }
    

    
    req.session.userId = user._id;
    

    
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