const express = require('express');
const router = express.Router();
const { getAllProducts, getProductBySlug, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', getAllProducts);
router.get('/:slug', getProductBySlug);
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.patch('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;