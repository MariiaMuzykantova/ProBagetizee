const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/userModel');
const auth = require('../middleware/auth');

// @method  POST
// @desc    User registration with email, username, and passwords.
router.post('/register', async (req, res) => {
  try {
    const { email, username, password, passwordCheck } = req.body;
    // Validations
    if (!email || !username || !password || !passwordCheck) {
      return res.status(400).json({ message: 'Required fields not entered.' });
    }

    if (password.length < 6 || password !== passwordCheck) {
      return res.status(400).json({
        message: 'Passwords must match and have a minimum length of 6.',
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        message: 'Username must have a minimum length of 3.',
      });
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email already exists.',
      });
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      username,
      password: hash,
    });

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @method  POST
// @desc    User login with email and password.
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Required fields not entered.' });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: 'Wrong password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/delete', auth, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.userId);
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/tokenIsValid', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.json(false);
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifiedToken) {
      return res.json(false);
    }

    const user = await User.findById(verifiedToken.id);

    if (!user) {
      return res.json(false);
    }

    return res.json(true);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    res.json({
      username: user.username,
      id: user._id,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
