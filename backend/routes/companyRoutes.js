// routes/companyRoutes.js
const express = require('express');
const router = express.Router();
const { createCompany, findCompanyByName, findCompanyById, updateCompany, deleteCompany } = require('../controllers/companyController');

// POST route to create a new company
router.post('/', async (req, res) => {
  const { name, companyId } = req.body;
  try {
    const newCompany = await createCompany(name, companyId);
    res.status(201).json(newCompany);
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ error: 'Failed to create company' });
  }
});

// GET route to find a company by name
router.get('/name/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const company = await findCompanyByName(name);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error('Error finding company by name:', error);
    res.status(500).json({ error: 'Failed to find company' });
  }
});

// GET route to find a company by ID
router.get('/:companyId', async (req, res) => {
  const { companyId } = req.params;
  try {
    const company = await findCompanyById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error('Error finding company by ID:', error);
    res.status(500).json({ error: 'Failed to find company' });
  }
});

// PUT route to update a company by ID
router.put('/:companyId', async (req, res) => {
  const { companyId } = req.params;
  const updates = req.body;
  try {
    const updatedCompany = await updateCompany(companyId, updates);
    res.status(200).json(updatedCompany);
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ error: 'Failed to update company' });
  }
});

// DELETE route to delete a company by ID
router.delete('/:companyId', async (req, res) => {
  const { companyId } = req.params;
  try {
    await deleteCompany(companyId);
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ error: 'Failed to delete company' });
  }
});

module.exports = router;
