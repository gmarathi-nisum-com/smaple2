const config = require('./main');
const mailgun = require('mailgun-js')({ apiKey: config.mailgun_priv_key,
  domain: config.mailgun_domain });

// Create and export function to send emails through Mailgun API
exports.sendEmail = function (recipient, message) {
  const data = {
    from: config.netextEmail,
    to: recipient,
    subject: message.subject,
    text: message.text,
    html: message.html
  };
  mailgun.messages().send(data, (error, body) => {
    if (error) {
        return 'error';
        // console.log("got an error: ", err);
    }else{
      return 'success'
    }
  });
};

exports.contactForm = function (sender, message) {
  const data = {
    from: sender,
    to: config.netextEmail,
    subject: message.subject,
    text: message.text
  };

  mailgun.messages().send(data, (error, body) => {
    if (error) {
        return 'error';
        // console.log("got an error: ", err);
    }else{
      return 'success'
    }
  });
};
