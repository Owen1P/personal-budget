const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true,
    // Hex string like #ED4523 (6 hex digits)
    match: /^#[0-9A-Fa-f]{6}$/
  }
});

module.exports = mongoose.model('Budget', budgetSchema);
