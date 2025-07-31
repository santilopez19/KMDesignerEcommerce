const Product = require('../models/product.model.js');

const getProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

const createProduct = async (req, res) => {
    const { name, description, sku, price, stock, images, category, isCustomizable } = req.body;
    const product = new Product({ name, description, sku, price, stock, images, category, isCustomizable });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

const updateProduct = async (req, res) => {
    const { name, description, price, stock, images, category, isCustomizable } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name;
        product.description = description;
        product.price = price;
        product.stock = stock;
        product.images = images;
        product.category = category;
        product.isCustomizable = isCustomizable;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.deleteOne();
        res.json({ message: 'Producto eliminado' });
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };