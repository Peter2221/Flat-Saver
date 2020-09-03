const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const config = require('../config/default.json');

const User = require('../models/User');

const router = express.Router();

// @route POST api/v1/users
// @desc register an user
// @access public
/*
  // Check incoming data
  // Check if not in DB
  // Add to DB
  // Return JWT
*/
router.post('/', [
  // Username must be longer than 5
  body('username', 'Username must be at least 5 chars length').isLength({ min: 5 }),
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

  const { username, email, password } = req.body;

  try{
    // Check if not in DB
    let user = await User.findOne({ email });
    if(user) {
      return res.status(400).json({ msg: "User already exists "});
    }

    // Create instance
    user = new User({
      username,
      email,
      password
    })

    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    console.log(user)
    
    // Add to DB
    await user.save();

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