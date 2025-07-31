const CustomDesign = require('../models/customDesign.model.js');

const createDesign = async (req, res) => {
    const { baseProduct, customizationData, notes, quantityRequested } = req.body;
    const design = new CustomDesign({
        user: req.user._id,
        baseProduct,
        customizationData,
        notes,
        quantityRequested
    });
    const createdDesign = await design.save();
    res.status(201).json(createdDesign);
};

const getAllDesigns = async (req, res) => {
    const designs = await CustomDesign.find({}).populate('user', 'name email').populate('baseProduct', 'name sku');
    res.json(designs);
};

const updateDesignStatus = async (req, res) => {
    const design = await CustomDesign.findById(req.params.id);
    if (design) {
        design.status = req.body.status || design.status;
        design.quoteAmount = req.body.quoteAmount || design.quoteAmount;
        const updatedDesign = await design.save();
        res.json(updatedDesign);
    } else {
        res.status(404).json({ message: 'Diseño no encontrado' });
    }
};

module.exports = { createDesign, getAllDesigns, updateDesignStatus };