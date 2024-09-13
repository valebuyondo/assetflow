const express = require('express');
const router = express.Router();
const Asset = require('../models/Asset');
const { protect, authorize } = require('../middleware/auth');
const auditLog = require('../middleware/auditLog');

const auditLog = require('../middleware/auditLog');

// ... existing imports ...

router.post('/', protect, authorize('admin', 'manager'), auditLog('create', 'Asset'), async (req, res) => {
  // ... existing code ...
});

router.patch('/:id', protect, authorize('admin', 'manager'), auditLog('update', 'Asset'), async (req, res) => {
  // ... existing code ...
});

router.delete('/:id', protect, authorize('admin'), auditLog('delete', 'Asset'), async (req, res) => {
  // ... existing code ...
});

// GET all assets
router.get('/', protect, async (req, res) => {
  try {
    const assets = await Asset.find().populate('assignedTo', 'username');
    res.json(assets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single asset
router.get('/:id', protect, async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id).populate('assignedTo', 'username');
    if (!asset) return res.status(404).json({ message: 'Asset not found' });
    res.json(asset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new asset
router.post('/', protect, authorize('admin', 'manager'), async (req, res) => {
  const asset = new Asset(req.body);
  try {
    const newAsset = await asset.save();
    res.status(201).json(newAsset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE an asset
router.patch('/:id', protect, authorize('admin', 'manager'), async (req, res) => {
  try {
    const asset = await Asset.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!asset) return res.status(404).json({ message: 'Asset not found' });
    res.json(asset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an asset
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const asset = await Asset.findByIdAndDelete(req.params.id);
    if (!asset) return res.status(404).json({ message: 'Asset not found' });
    res.json({ message: 'Asset deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD maintenance log
router.post('/:id/maintenance', protect, authorize('admin', 'manager'), async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: 'Asset not found' });
    
    asset.maintenanceLogs.push(req.body);
    asset.lastMaintenance = new Date();
    await asset.save();
    
    res.status(201).json(asset);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET maintenance logs for an asset
router.get('/:id/maintenance', protect, async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: 'Asset not found' });
    res.json(asset.maintenanceLogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/schedule-maintenance', protect, authorize('admin', 'manager'), async (req, res) => {
    try {
      const { date, description } = req.body;
      const asset = await Asset.findById(req.params.id);
      
      if (!asset) return res.status(404).json({ message: 'Asset not found' });
      
      asset.nextMaintenance = new Date(date);
      asset.maintenanceLogs.push({
        date: new Date(date),
        description,
        scheduled: true,
        performedBy: req.user._id
      });
      
      await asset.save();
      res.json(asset);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

router.get('/search', protect, async (req, res) => {
    try {
      const { q, category, subCategory, status, assignedTo, minValue, maxValue } = req.query;
      
      let query = {};
      
      if (q) {
        query.$text = { $search: q };
      }
      
      if (category) query.category = category;
      if (subCategory) query.subCategory = subCategory;
      if (status) query.status = status;
      if (assignedTo) query.assignedTo = assignedTo;
      
      if (minValue || maxValue) {
        query.currentValue = {};
        if (minValue) query.currentValue.$gte = Number(minValue);
        if (maxValue) query.currentValue.$lte = Number(maxValue);
      }
      
      const assets = await Asset.find(query).populate('assignedTo', 'username');
      res.json(assets);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.get('/reports/summary', protect, authorize('admin', 'manager'), async (req, res) => {
    try {
      const totalAssets = await Asset.countDocuments();
      const totalValue = await Asset.aggregate([
        { $group: { _id: null, total: { $sum: "$currentValue" } } }
      ]);
      const assetsByCategory = await Asset.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } }
      ]);
      const assetsByStatus = await Asset.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ]);
      
      res.json({
        totalAssets,
        totalValue: totalValue[0]?.total || 0,
        assetsByCategory,
        assetsByStatus
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


router.post('/bulk', protect, authorize('admin'), async (req, res) => {
    try {
      const assets = req.body.assets;
      if (!Array.isArray(assets)) {
        return res.status(400).json({ message: 'Invalid input: expected an array of assets' });
      }
      
      const createdAssets = await Asset.insertMany(assets);
      res.status(201).json(createdAssets);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  module.exports = router;