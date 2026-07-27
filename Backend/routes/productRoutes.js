const express = require('express');
const router = express.Router();
const { getAllProducts, getProductBySlug, createProduct, updateProduct, deleteProduct } = require('../controller/productController');
const { protect } = require('../middleware/Authmiddleware');

router.get('/', getAllProducts);
router.get('/:slug', getProductBySlug);
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.patch('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;