const mongoose = require('mongoose');

const customDesignSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    baseProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    status: { type: String, enum: ['pending_review', 'quoted', 'in_production', 'completed'], default: 'pending_review' },
    customizationData: { type: Object, required: true },
    notes: { type: String },
    quantityRequested: { type: Number, required: true },
    quoteAmount: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('CustomDesign', customDesignSchema);