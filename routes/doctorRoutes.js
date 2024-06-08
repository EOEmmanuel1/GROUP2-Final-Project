const express = require('express');
const { createDoctor } = require('../controllers/doctorController');
const router = express.Router();

router.post('/create', createDoctor);

// Add more doctor routes as needed

module.exports = router