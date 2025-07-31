const express = require('express');
const { addOrderItems, getOrderById, updateOrderStatus, getUserOrders, getAllOrders } = require('../controllers/order.controller.js');
const { protect, admin } = require('../middleware/auth.middleware.js');
const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrders);
router.route('/myorders').get(protect, getUserOrders);
router.route('/:id').get(protect, getOrderById).put(protect, admin, updateOrderStatus);

module.exports = router;