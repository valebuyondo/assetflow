const mongoose = require('mongoose');

const MaintenanceLogSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true,
    min: 0
  },
  performedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Declare AssetSchema first before adding methods
const AssetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  subCategory: {
    type: String,
    trim: true
  },
  serialNumber: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  model: {
    type: String,
    trim: true
  },
  manufacturer: {
    type: String,
    trim: true
  },
  purchaseDate: {
    type: Date,
    required: true
  },
  purchasePrice: {
    type: Number,
    required: true,
    min: 0
  },
  currentValue: {
    type: Number,
    required: true,
    min: 0
  },
  residualValue: {
    type: Number,
    min: 0
  },
  usefulLife: {
    type: Number,
    min: 0
  },
  depreciationMethod: {
    type: String,
    enum: ['Straight Line', 'Declining Balance', 'Sum of Years Digits', 'Units of Production'],
    default: 'Straight Line'
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    required: true,
    enum: ['Available', 'In Use', 'Under Maintenance', 'Retired'],
    default: 'Available'
  },
  condition: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Poor'],
    default: 'Good'
  },
  lastMaintenance: {
    type: Date
  },
  nextMaintenance: {
    type: Date
  },
  maintenanceLogs: [MaintenanceLogSchema],
  notes: {
    type: String
  },
  tags: [{
    type: String,
    trim: true
  }],
  attachments: [{
    name: String,
    path: String
  }],
  qrCode: {
    type: String
  }
}, {
  timestamps: true
});

// Methods on AssetSchema (place these after the schema declaration)
AssetSchema.methods.calculateDepreciation = function() {
  const currentDate = new Date();
  const age = (currentDate - this.purchaseDate) / (365 * 24 * 60 * 60 * 1000); // age in years

  let depreciation = 0;
  
  switch (this.depreciationMethod) {
    case 'Straight Line':
      depreciation = (this.purchasePrice - this.residualValue) * (age / this.usefulLife);
      break;
    case 'Declining Balance':
      const rate = 2 / this.usefulLife; // double declining balance
      depreciation = this.purchasePrice * Math.pow((1 - rate), age);
      break;
    // Add other depreciation methods as needed
  }

  return Math.min(this.purchasePrice - this.residualValue, depreciation);
};

AssetSchema.methods.getCurrentValue = function() {
  return this.purchasePrice - this.calculateDepreciation();
};

AssetSchema.pre('save', function(next) {
  if (this.isNew) {
    // Generate QR code here
    this.qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${this._id}`;
  }
  next();
});

module.exports = mongoose.model('Asset', AssetSchema);
