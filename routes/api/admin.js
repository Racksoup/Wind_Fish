const auth = require('../../middleware/adminAuth');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const Admin = require('../../models/Admin');

// Get Admin
router.get('/', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// login Admin
router.post(
  '/',
  [
    check('username', 'Please include a username').exists(),
    check('password', 'Please include a Password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { username, password } = req.body;
    
    try {
      let admin = await Admin.findOne({ username });
      
      if (!admin) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      
      const isMatch = await bcrypt.compare(password, admin.password);
      
      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      
      const payload = {
        admin: {
          id: admin.id,
        },
      };
      
      jwt.sign(payload, process.env.ADMIN_SECRET, { expiresIn: '5h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Create Admin
// router.post('/create', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     let admin = await Admin.findOne({ username });

//     if (admin) {
//       return res.status(400).json({ errors: [{ msg: 'Admin already exists' }] });
//     }

//     admin = new Admin({
//       username,
//       password,
//     });

//     const salt = await bcrypt.genSalt(10);

//     admin.password = await bcrypt.hash(password, salt);

//     await admin.save();

//     const payload = {
//       admin: {
//         id: admin.id,
//       },
//     };

//     jwt.sign(payload, process.env.ADMIN_SECRET, { expiresIn: '5h' }, (err, token) => {
//       if (err) throw err;
//       res.json({ token });
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

module.exports = router;
