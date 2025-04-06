const Item = require('../models/Item');

// Get all items with optional filters
exports.getItems = async (req, res) => {
  try {
    const { category, condition, minPrice, maxPrice, search, status } = req.query;
    let query = {};

    // Apply filters
    if (category) query.category = category;
    if (condition) query.condition = condition;
    if (status) query.status = status;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$text = { $search: search };
    }

    const items = await Item.find(query)
      .populate('seller', 'name email')
      .sort({ createdAt: -1 });

    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single item
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
      .populate('seller', 'name email');
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new item
exports.createItem = async (req, res) => {
  try {
    // Handle uploaded files
    const images = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];
    
    const item = new Item({
      ...req.body,
      seller: req.user._id,
      images: images
    });
    
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update item
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if user is the seller
    if (item.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this item' });
    }

    Object.assign(item, req.body);
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete item
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if user is the seller
    if (item.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    await item.deleteOne();
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 