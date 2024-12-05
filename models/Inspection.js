const mongoose = require('mongoose');

const InspectionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  property: {
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String
    },
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
    default: 'PENDING'
  },
  type: {
    type: String,
    enum: ['ROUTINE', 'EMERGENCY', 'POST_STORM', 'MAINTENANCE'],
    required: true
  },
  scheduledDate: {
    type: Date
  },
  completedDate: {
    type: Date
  },
  issues: [{
    category: {
      type: String,
      enum: ['LEAK', 'DAMAGE', 'MAINTENANCE', 'OTHER']
    },
    description: String,
    severity: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
    },
    photos: [{
      url: String,
      caption: String,
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }]
  }],
  notes: [{
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  recommendation: {
    action: {
      type: String,
      enum: ['NO_ACTION', 'REPAIR', 'REPLACE', 'MAINTAIN']
    },
    description: String,
    estimatedCost: {
      min: Number,
      max: Number,
      currency: {
        type: String,
        default: 'USD'
      }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
InspectionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Inspection', InspectionSchema);
