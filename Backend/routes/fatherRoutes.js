const express = require('express');
const router = express.Router();
const geminiController = require('../controllers/fatherController');

// Route to generate a response from the Gemini model
router.post('/generate', geminiController.generateResponse);

module.exports = router;