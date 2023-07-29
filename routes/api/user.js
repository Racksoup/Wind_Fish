const User = require('../../models/User');
const userAuth = require('../../middleware/userAuth');

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

//  Desc    Create User
router.post('/', async (req, res) => {
  const { email, name } = req.body;
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const isEmail = emailRegex.test(email);

  if (isEmail) {
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        email,
        name,
        comments: [],
        likes: [],
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(email, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, process.env.ACCOUNT_SECRET, { expiresIn: '7d' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
});

//  Desc    Get User
router.get('/', userAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//  Desc    Get User Auth
router.post(
  '/auth',
  async (req, res) => {
    const { email } = req.body;

    try {
      const regex = new RegExp(['^', email, '$'].join(''), 'i');
      let user = await User.findOne({ email: regex });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, process.env.ACCOUNT_SECRET, { expiresIn: '7d' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
