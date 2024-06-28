const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId } // Unique ID for the company
});

module.exports = mongoose.model('Company', companySchema);
