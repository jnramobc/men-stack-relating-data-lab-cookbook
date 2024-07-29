// controllers/foods.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Display pantry 
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('foods/index', { pantry: currentUser.pantry });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

/// form to add new pantry item
router.get('/new', (req, res) => {
  res.render('foods/new', { user: req.session.user });
});

// form submit for new pantry item
router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${req.session.user._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Delete pantry item
router.delete('/:itemId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    

    currentUser.pantry.pull({ _id: req.params.itemId });
    await currentUser.save();

    res.redirect(`/users/${req.session.user._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Edit pantry item
router.get('/:itemId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const foodItem = currentUser.pantry.id(req.params.itemId);
    res.render('foods/edit', { foodItem, user: req.session.user });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// handle form submit for editing pantry item
router.put('/:itemId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const foodItem = currentUser.pantry.id(req.params.itemId);
    foodItem.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${req.session.user._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

module.exports = router;
