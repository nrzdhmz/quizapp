const express = require('express');
const { createCompany, registerEmployer, registerEmployee, login } = require('../controllers/authController');

const router = express.Router();

router.post('/create-company', createCompany);
router.post('/register-employer', registerEmployer);
router.post('/register-employee', registerEmployee);
router.post('/login', login);

module.exports = router;
