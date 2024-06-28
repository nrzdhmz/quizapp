const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' } // Reference to Company model
});

module.exports = mongoose.model('User', UserSchema);
