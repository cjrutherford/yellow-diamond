const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ApplicationSchema = new Schema({
	appPass: { type: String, required: true },
	appName: { type: String, required: true },
	appOwner: { type: Schema.Types.ObjectId, required: true },
	appDescription: String,
	appIcon: {type: String, default: 'http://placehold.it/300x300'},
	appBanner: {type: String, default: 'http://placehold.it/1024x600'},
	users: [{type: Schema.Types.ObjectId, ref: 'User'}],
	ownerDelegates: [{type: Schema.Types.ObjectId, ref: 'User'}],
	permBannedUsers: [{type: Schema.Types.ObjectId, ref: 'User'}],
	redirectURL: {type: String, required: true},
	tempBannedUsers: [{expires: {type: Date, required: true}, user: {type:Schema.Types.ObjectId, ref: 'User'}}]
});

const AppTokenSchema = new Schema({
	appId: { type: Schema.Types.ObjectId, ref: 'Application' },
	tokenType: { type: String, enum: ['access', 'refresh'] },
	token: { type: String, required: true },
	status: { type: String, enum: ['valid', 'revoked'] },
});

module.exports = {
	Application: mongoose.model('Application', ApplicationSchema),
	AppToken: mongoose.model('AppToken', AppTokenSchema),
};
