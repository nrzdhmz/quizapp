const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employee', 'employer'], required: true },
  companyName: { type: String }, // Ensure companyName is required
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', sparse: true } // Reference to Company model
});

module.exports = mongoose.model('User', userSchema);
