import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import { response } from 'express';

export const login = async (req, res) => {
  try {
    console.log('========== LOGIN ATTEMPT ==========');
    console.log('Request body:', req.body);
    console.log('Request headers:', req.headers);

    const { username, password } = req.body;

    console.log('Extracted username:', username);
    console.log('Extract password length:', password ? password.length : 'undefined');

    const user = await User.findOne({ username }).populate('purchasedCourses');

    console.log('Database query result:', user ? 'USER FOUND' : 'USER NOT FOUND');

    if (!user) {
      console.log('Login failed: User not found in database');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log('User details from database:');
    console.log('  _id:', user._id);
    console.log('  username:', user.username);
    console.log('  email:', user.email);
    console.log('  role:', user.role);
    console.log('  password hash exists:', !!user.password);
    console.log('  password hash length:', user.password ? user.password.length : 0);

    const isMatch = await user.comparePassword(password);

    console.log('Password comparison result:', isMatch ? 'MATCH' : 'NO MATCH');

    if (!isMatch) {
      console.log('Login failed: Password does not match');
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
    console.log('JWT_SECRET length:', process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0);

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    console.log('JWT generated successfully');

    const response = {
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        purchasedCourses: user.purchasedCourses
      }
    };

    console.log('Sending response:', {
      success: response.success,
      message: response.message,
      userRole: response.user.role
    });

    res.status(200).json(response);
  } catch (error) {
    console.error('========== LOGIN ERROR ==========');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('purchasedCourses')
      .select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
