const nodemailer = require("nodemailer");

module.exports.sendConfirmationEmail = function(data,token) {
	console.log("Check");

	const transport = nodemailer.createTransport({
			service: "Gmail",
			auth: {
				user:"lamchunkit199902@gmail.com",
				pass:"Ss28955619",
			},
	});

	transport.sendMail({
		from:'lamchunkit199902@gmail.com',
		to:data.email,
		subject: "Bookstore Email Confirmation",
		html: ` <h1>Email Confirmation</h1>
				<h2>hello ${data.name}</h2>
				<p>Thank you for your registration on Bookstore. Please confirm your email by clicking on the following link in order to use the service</p>
				<a href=http://localhost:5000/confirm/${token}> Click here</a>
		`
	}).catch(err => {
		console.log(err);
	})
};