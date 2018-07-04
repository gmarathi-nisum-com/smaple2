module.exports = {
  // Secret key for JWT signing and encryption
  secret: 'PemmasaniDasari',
  // Database connection information
  database: 'mongodb://localhost:27017/postme',
  // Setting port for server
  port: 3000,
  // Configuring Mailgun API for sending transactional email
  mailgun_priv_key: 'key-ae8142f342470485042740754160a8a4',
  // Configuring Mailgun domain for sending transactional email
  mailgun_domain: 'sandbox91f4dfcc32d74ed1a14bbe50cd9d7508.mailgun.org',
  // Mailchimp API key
  mailchimpApiKey: 'mailchimp api key here',
  // SendGrid API key
  sendgridApiKey: 'sendgrid api key here',
  // Stripe API key
  stripeApiKey: 'stripe api key goes here',
  // necessary in order to run tests in parallel of the main app
  test_port: 3001,
  test_db: 'postme',
  test_env: 'test',
  netextEmail : 'hemadri.dasari1990@gmail.com'
};
