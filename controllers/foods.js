// controllers/foods.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Index Route: GET /users/:userId/foods
router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('foods/index', { pantry: currentUser.pantry });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// New Route: GET /users/:userId/foods/new
router.get('/new', (req, res) => {
  res.render('foods/new', { user: req.session.user });
});

// Create Route: POST /users/:userId/foods
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

// Delete Route: DELETE /users/:userId/foods/:itemId
router.delete('/:itemId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.id(req.params.itemId).remove();
    await currentUser.save();
    res.redirect(`/users/${req.session.user._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

// Edit Route: GET /users/:userId/foods/:itemId/edit
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

// Update Route: PUT /users/:userId/foods/:itemId
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
