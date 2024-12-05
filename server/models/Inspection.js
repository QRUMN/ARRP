const mongoose = require('mongoose');

const InspectionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['general', 'damage', 'maintenance'],
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  notes: {
    type: String
  },
  findings: {
    type: String
  },
  recommendations: {
    type: String
  },
  inspector: {
    name: String,
    notes: String
  },
  photos: [{
    url: String,
    description: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  report: {
    url: String,
    generatedAt: Date
  }
}, {
  timestamps: true
});

// Add index for efficient querying
InspectionSchema.index({ user: 1, date: -1 });

module.exports = mongoose.model('Inspection', InspectionSchema);
