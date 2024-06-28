const express = require('express');
const { register, login, enrollCompany } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register); // Endpoint for user registration
router.post('/login', login); // Endpoint for user login
router.put('/enroll-company', enrollCompany); // Endpoint to enroll user in a company

module.exports = router;
