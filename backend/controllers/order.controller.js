const Order = require('../models/order.model.js');

const addOrderItems = async (req, res) => {
    const { items, shippingAddress, totalAmount } = req.body;
    if (items && items.length === 0) {
        return res.status(400).json({ message: 'No hay artículos en la orden' });
    }
    const order = new Order({
        user: req.user._id,
        items,
        shippingAddress,
        totalAmount
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
};

const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: 'Orden no encontrada' });
    }
};

const updateOrderStatus = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.status = req.body.status || order.status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Orden no encontrada' });
    }
};

const getUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
};

const getAllOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
};

module.exports = { addOrderItems, getOrderById, updateOrderStatus, getUserOrders, getAllOrders };