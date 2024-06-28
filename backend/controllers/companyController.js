// controllers/companyController.js
const Company = require('../models/company');


// Create a new company
exports.createCompany = async (name, companyId) => {
  try {
    const newCompany = new Company({ name, companyId });
    await newCompany.save();
    return newCompany;
  } catch (error) {
    console.error('Error creating company:', error);
    throw new Error('Failed to create company');
  }
};

// Find a company by name
exports.findCompanyByName = async (name) => {
  try {
    const company = await Company.findOne({ name });
    return company;
  } catch (error) {
    console.error('Error finding company by name:', error);
    throw new Error('Failed to find company');
  }
};

// Find a company by ID
exports.findCompanyById = async (companyId) => {
  try {
    const company = await Company.findById(companyId);
    return company;
  } catch (error) {
    console.error('Error finding company by ID:', error);
    throw new Error('Failed to find company');
  }
};

// Update a company by ID
exports.updateCompany = async (companyId, updates) => {
  try {
    const company = await Company.findByIdAndUpdate(companyId, updates, { new: true });
    return company;
  } catch (error) {
    console.error('Error updating company:', error);
    throw new Error('Failed to update company');
  }
};

// Delete a company by ID
exports.deleteCompany = async (companyId) => {
  try {
    await Company.findByIdAndDelete(companyId);
  } catch (error) {
    console.error('Error deleting company:', error);
    throw new Error('Failed to delete company');
  }
};
