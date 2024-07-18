// controllers/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to get all users for the community page
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.render('users/index', { users });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Route to get a specific user's pantry items
// This route retrieves a specific user by their userId and renders their pantry items
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.render('users/show', { user });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;

