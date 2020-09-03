const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const config = require('../config/default.json');

const User = require('../models/User');

const router = express.Router();

// @route GET api/v1/auth
// @desc get logged user
// @access private
router.get('/', verifyToken, async (req, res) => {
  try {
    // Get user id from token - middleware function handle it
    const userId = req.user.id;
    const user = await User.findById(userId);
    res.json(user);
  } catch(err) {
    res.status(500).json({ msg: "Server error" })
  }
});

// @route POST api/v1/auth
// @desc login user
// @access public
router.post('/', [
  // Email
  body('email', 'Email must be correct').isEmail(),
  // Password
  body('password', 'Password must be at least 5 chars length').isLength({ min: 5 })
], async (req, res) => {
  // Get errors
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try{
    // Check if not in DB
    let user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({ msg: "No user with this email and password"});
    }

    // If password is matched
    const match = await bcrypt.compare(password, user.password);

    if(!match) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Return JWT with data
    const payload = {
      user: {
        id: user.id
      }
    }

    // Create JWT, expires in 10h
    jwt.sign(payload, config.secretKeyJwt , { expiresIn: '10h' }, (err, token) => {
      if(err) throw err;
      res.json({ token: token })
    })
  } catch(err) {
    console.log(err);
  }
})

module.exports = router;