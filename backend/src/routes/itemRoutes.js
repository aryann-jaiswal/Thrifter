const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Public routes
router.get('/', itemController.getItems);
router.get('/:id', itemController.getItem);

// Protected routes
router.post('/', auth, upload.array('images', 5), itemController.createItem);
router.put('/:id', auth, upload.array('images', 5), itemController.updateItem);
router.delete('/:id', auth, itemController.deleteItem);

module.exports = router; 