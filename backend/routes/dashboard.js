// backend/routes/dashboard.js
const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');
const User = require('../models/User');

// GET route to fetch dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalAssets = await Asset.countDocuments();
    const totalUsers = await User.countDocuments();
    const recentActivities = [
      { activity: 'Asset #123 checked in', date: '2024-09-14' },
      { activity: 'New user registered', date: '2024-09-13' }
    ];

    res.status(200).json({
      totalAssets,
      totalUsers,
      recentActivities
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
