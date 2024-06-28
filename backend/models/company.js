const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyCode: { type: String, required: true, unique: true },
    employers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Company', CompanySchema);
