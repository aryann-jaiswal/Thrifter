const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', itemController.getItems);
router.get('/:id', itemController.getItem);

// Protected routes
router.post('/', auth, itemController.createItem);
router.put('/:id', auth, itemController.updateItem);
router.delete('/:id', auth, itemController.deleteItem);

module.exports = router; 