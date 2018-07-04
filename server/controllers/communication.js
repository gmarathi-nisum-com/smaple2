const mailgun = require('../config/mailgun');

exports.sendContactForm = function (req, res, next) {
  const fromText = `${req.body.firstName} ${req.body.lastName} ` +
                  `<${req.body.email}>`;

  const message = {
    subject: req.body.subject,
    text: req.body.message
  };

  var response = mailgun.contactForm(req.body.email, message);
	if(response == 'error'){
		return res.status(500).json({ message: 'Error occured! Unable to send your form! Please try again after sometime' });
	}else{
		return res.status(200).json({ message: 'We received your form. We will be in touch with you soon.' });
	}
  
};
