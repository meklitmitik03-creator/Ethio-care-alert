const express = require('express');
const router = express.Router();
const User = require('../User');

// 1. REGISTER - Create a new user account
router.post('/register', async (req, res) => {
  try {
    const { fullName, age, category, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const newUser = new User({ fullName, age, category, email, password });
    await newUser.save();

    res.status(201).json({ 
      message: 'User registered successfully',
      user: { id: newUser._id, fullName: newUser.fullName, category: newUser.category } 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. LOGIN - Authenticate user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      user: { id: user._id, fullName: user.fullName, category: user.category }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;