const User = require('../models/User');
const Company = require('../models/Company');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_SECRET = 'your_jwt_secret'; // Replace with your actual secret

exports.createCompany = async (req, res) => {
    const { companyName, companyPassword } = req.body;

    try {
        // Check if the company already exists
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({ error: 'Company already exists' });
        }

        // Generate a unique company code
        const companyCode = crypto.randomBytes(4).toString('hex');
        const hashedCompanyPassword = await bcrypt.hash(companyPassword, 10);

        company = new Company({
            name: companyName,
            password: hashedCompanyPassword,
            companyCode,
            employers: [],
            employees: []
        });
        await company.save();

        res.status(201).json({ companyCode });
    } catch (error) {
        res.status(400).json({ error: 'Error creating company' });
    }
};

exports.registerEmployer = async (req, res) => {
    const { username, email, password, companyCode } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Find the company using company code
        const company = await Company.findOne({ companyCode });
        if (!company) {
            return res.status(400).json({ error: 'Invalid company code' });
        }

        // Create employer and link to company
        const user = new User({ username, email, password: hashedPassword, role: 'employer', companyId: company._id });
        await user.save();

        company.employers.push(user._id);
        await company.save();

        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: 'Error registering employer' });
    }
};

exports.registerEmployee = async (req, res) => {
    const { username, email, password, companyCode } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // Find the company using company code
        const company = await Company.findOne({ companyCode });
        if (!company) {
            return res.status(400).json({ error: 'Invalid company code' });
        }

        // Create employee and link to company
        const user = new User({ username, email, password: hashedPassword, role: 'employee', companyId: company._id });
        await user.save();

        company.employees.push(user._id);
        await company.save();

        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: 'Error registering employee' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in user' });
    }
};
