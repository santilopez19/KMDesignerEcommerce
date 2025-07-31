const express = require('express');
const { createDesign, getAllDesigns, updateDesignStatus } = require('../controllers/design.controller.js');
const { protect, admin } = require('../middleware/auth.middleware.js');
const router = express.Router();

router.route('/').post(protect, createDesign).get(protect, admin, getAllDesigns);
router.route('/:id/status').put(protect, admin, updateDesignStatus);

module.exports = router;