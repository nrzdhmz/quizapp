const User = require('../models/user');
const Company = require('../models/company');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

exports.register = async (req, res) => {
  try {
    const { username, email, password, role, companyName } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      companyName,
    });

    // Save user to database
    await newUser.save();

    // If role is employer, create a new company if it doesn't exist
    if (role === 'employer' && companyName) {
      // Check if company with the same name already exists
      let company = await Company.findOne({ name: companyName });
      if (!company) {
        company = new Company({ name: companyName });
        await company.save();
      }
      newUser.companyId = company._id; // Assign companyId to the employer user
      await newUser.save();
    }

    // Return user data in the response
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        companyName: newUser.companyName,
        companyId: newUser.companyId // Include companyId in the response
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Return user data in the response
    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        companyId: user.companyId // Include companyId in the response
      }
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.enrollCompany = async (req, res) => {
  try {
    const { userId, companyId } = req.body;

    // Find user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is already enrolled in a company
    if (user.role === 'employee' && user.companyId) {
      return res.status(400).json({ message: 'Employee is already enrolled in a company' });
    }

    // Find company by companyId
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found or invalid company ID' });
    }

    // Enroll the user (employee) in the company
    user.companyId = companyId;
    await user.save();

    // Return updated user data
    res.status(200).json({
      message: 'User enrolled in company successfully',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        companyId: user.companyId
      }
    });
  } catch (error) {
    console.error('Error enrolling user in company:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
