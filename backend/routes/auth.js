const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Create a new user (no manual hashing here)
      user = new User({
        username,
        email,
        password  // Password will be hashed automatically in the pre('save') hook
      });

      // Save the user to the database
      await user.save();

      // Create and return a JWT token
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error('Server error:', err.message);
      res.status(500).send('Server error');
    }
  }
);

// Login a user
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find the user by email
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }
//     console.log('Hashed password in DB:', user.password);  // Log the stored hashed password
//     // Use the comparePassword method from the User model
//     const isMatch = await user.comparePassword(password);
//     console.log('Password match:', isMatch);  // Log true or false
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     // Generate a JWT token
//     // const payload = { user: { id: user.id } };
//     const payload = {
//       user: {
//         id: user.id,
//         role: user.role  // Make sure the role is part of the token payload
//       }
//     };

//     jwt.sign(
//       payload,
//       process.env.JWT_SECRET,
//       { expiresIn: 360000 },
//       (err, token) => {
//         if (err) throw err;
//         res.json({ token });
//       }
//     );
//   } catch (err) {
//     console.error('Server error:', err.message);
//     res.status(500).send('Server error');
//   }
// });
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Ensure role is part of the JWT payload
    const payload = {
      user: {
        id: user.id,
        role: user.role  // Include the user's role in the token
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;