// File: Backend/routes/sisterRoutes.js
const express = require('express');
const router = express.Router();
const sisterController = require('../controllers/sisterController');

// Make sure the function name matches exactly what's exported in the controller
router.post('/sister', sisterController.generateSisterResponse);

module.exports = router;