const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
	firstName: String,
	middleInitial: String,
	lastName: String,
	// phoneNumber: String,
	emailAddress: {
		type: String,
		required: true,
		unique: true,
	},
	userName: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	gender: String,
	birthDate:{type: Date, default: Date.now()},
	authAdmin: Boolean,
});

module.exports = User = mongoose.model('User', UserSchema);
