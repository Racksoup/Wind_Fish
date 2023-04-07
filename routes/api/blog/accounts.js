const Account = require('../../../models/Account');
const accountAuth = require('../../../middleware/accountAuth');

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

//  Desc    Create Account
router.post('/', async (req, res) => {
  const { email, password, name } = req.body;
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const isEmail = emailRegex.test(email);

  if (isEmail) {
    try {
      let account = await Account.findOne({ email });
      if (account) {
        return res.status(400).json({ errors: [{ msg: 'Account already exists' }] });
      }

      account = new Account({
        email,
        password,
        name,
        comments: [],
        likes: [],
      });

      const salt = await bcrypt.genSalt(10);
      account.password = await bcrypt.hash(password, salt);

      await account.save();

      const payload = {
        account: {
          id: account.id,
        },
      };

      jwt.sign(payload, process.env.ACCOUNT_SECRET, { expiresIn: '5h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
});

//  Desc    Get Account
router.get('/', accountAuth, async (req, res) => {
  try {
    const account = await Account.findById(req.account.id).select('-password');
    res.json(account);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//  Desc    Get Account Auth
router.post(
  '/auth',
  [
    check('email', 'Please include a Email').exists(),
    check('password', 'Please include a Password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const regex = new RegExp(['^', email, '$'].join(''), 'i');
      let account = await Account.findOne({ email: regex });

      if (!account) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, account.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        account: {
          id: account.id,
        },
      };

      jwt.sign(payload, process.env.ACCOUNT_SECRET, { expiresIn: '5h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//  Delete Account
router.delete('/', accountAuth, async (req, res) => {
  try {
    const account = await Account.findByIdAndDelete(req.account.id);
    res.json(account);
  } catch (error) {
    console.log(error);
  }
});

//  Change Account Name
router.put('/name', accountAuth, async (req, res) => {
  try {
    const account = await Account.findByIdAndUpdate(
      req.account.id,
      { name: req.body.name },
      { new: true }
    );
    res.json(account);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
