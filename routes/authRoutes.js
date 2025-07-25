const express = require('express');
const { registerUser, loginUser, getUserProfile,changePassword } = require('../controller/authController');
const { protect } = require('../middleware/authMiddleware');
const User = require('../model/User');
const Recipe = require('../model/Recipe');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Get user profile (protected route)
router.get('/profile', protect, getUserProfile);

router.post('/changepassword',protect,changePassword)

// Add a recipe to favorites
router.post('/favorites/:recipeId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const recipeId = req.params.recipeId;
    if (!user.favorites.includes(recipeId)) {
      user.favorites.push(recipeId);
      await user.save();
    }
    res.json({ message: 'Recipe added to favorites', favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Remove a recipe from favorites
router.delete('/favorites/:recipeId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const recipeId = req.params.recipeId;
    user.favorites = user.favorites.filter(id => id.toString() !== recipeId);
    await user.save();
    res.json({ message: 'Recipe removed from favorites', favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all favorite recipes
router.get('/favorites', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('favorites');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
