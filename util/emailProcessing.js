const mailer = require('nodemailer');
const log = require('../logger');

module.exports = queueEmail = async (referralLink, email) => {
	let account = await mailer.createTestAccount();

	let transporter = mailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false,
		auth: {
			user: account.user,
			pass: account.pass,
		},
	});

	const mailOptions = {
		from: 'Yellow Diamond <no-reply@garnetlabs.com>',
		to: email,
		subject: 'Reset Password for ' + email,
		html: `<div>
                <h1>Reset Your Password ${email}</h1>
                <h2><a href="${referralLink}">${referralLink}</a></h2>
        </div>`,
	};

	let info = await transporter.sendMail(mailOptions);
	log.info(`Message Sent ${info.messageId}`);
};
