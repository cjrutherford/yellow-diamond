const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResetLinkSchema = new Schema({
	email: { type: String, required: true },
	stillValid: { type: Boolean, default: true },
});

module.exports = mongoose.model('ResetLink', ResetLinkSchema);
