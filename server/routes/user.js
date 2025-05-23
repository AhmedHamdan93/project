import express from 'express';
import User from '../models/User.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Get user profile (protected route)
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
    });
  }
});

// Update user profile (protected route)
router.put('/profile', isAuthenticated, async (req, res) => {
  try {
    const { name } = req.body;
    const updates = { name, updatedAt: Date.now() };
    
    const user = await User.findByIdAndUpdate(
      req.session.userId,
      updates,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error updating profile',
    });
  }
});

export default router;