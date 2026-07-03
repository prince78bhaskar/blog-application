import jwt from 'jsonwebtoken';
import User from '../model/User.js';
import { response } from 'express';

export const login = async (req, res) => {

  try {
     console.log('authController.login body:', req.body);

    const { username, password } = req.body;

    const user = await User.findOne({ username }).populate('purchasedCourses');

    console.log("DB Password Hash:", user?.password);

console.log("DB User:", user);

    console.log("USER:", user ? "FOUND" : "NOT FOUND");


    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await user.comparePassword(password);

   if (!isMatch) {
  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
    debug: {
      username,
      enteredPassword: password,
      dbPasswordHash: user.password,
      isMatch
    }
  });
}

    const token = jwt.sign(
      { 
        userId: user._id, 
        username: user.username, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(200).json({
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
    });
  } catch (error) {
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
