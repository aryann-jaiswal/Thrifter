const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['Clothing', 'Electronics', 'Books', 'Home', 'Sports', 'Other']
  },
  condition: {
    type: String,
    required: true,
    enum: ['New', 'Like New', 'Good', 'Fair', 'Poor']
  },
  images: [{
    type: String,
    required: true
  }],
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Available', 'Sold', 'Reserved'],
    default: 'Available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add text index for search functionality
itemSchema.index({ title: 'text', description: 'text' });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item; 