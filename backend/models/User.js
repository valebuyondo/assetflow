const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'user'],
    default: 'user'
  }
}, {
  timestamps: true
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);  // 12 rounds of salt
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  console.log('Password match:', isMatch);  // Log true or false
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);