// File: Backend/routes/brotherRoutes.js
const express = require('express');
const router = express.Router();
const brotherController = require('../controllers/brotherController');

// Route to generate a response from the brother model
router.post('/brother', brotherController.generateResponse);

module.exports = router;