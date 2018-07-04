const AuthenticationController = require('./controllers/authentication');
const GeneralController = require('./controllers/general');
const UserController = require('./controllers/user');
const ChatController = require('./controllers/chat');
const CommunicationController = require('./controllers/communication');
const StripeController = require('./controllers/stripe');
const express = require('express');
const passport = require('passport');
const ROLE_MEMBER = require('./constants').ROLE_MEMBER;
const ROLE_CLIENT = require('./constants').ROLE_CLIENT;
const ROLE_OWNER = require('./constants').ROLE_OWNER;
const ROLE_ADMIN = require('./constants').ROLE_ADMIN;

const passportService = require('./config/passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  // Initializing route groups
  const apiRoutes = express.Router(),
    authRoutes = express.Router(),
    userRoutes = express.Router(),
    chatRoutes = express.Router(),
    payRoutes = express.Router(),
    communicationRoutes = express.Router(),
    generalRoutes = express.Router();

  //= ========================
  // Auth Routes
  //= ========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', AuthenticationController.login);

  // Password reset request route (generate/send token)
  authRoutes.post('/fpass', AuthenticationController.forgotPassword);

  // Password reset route (change password using token)
  authRoutes.post('/resetpassword/:token', AuthenticationController.verifyToken);


  authRoutes.post('/confirmation', AuthenticationController.confirmation);
  authRoutes.post('/resend', AuthenticationController.resendToken);

  //= ========================
  // Post route
  //= ========================





  //= ========================
  // User Routes
  //= ========================

  // Set user routes as a subgroup/middleware to apiRoutes
  apiRoutes.use('/user', userRoutes);

  userRoutes.post('/addPost', UserController.addPost);
  userRoutes.get('/getPost', UserController.getPostData);
  // View user profile route
  userRoutes.get('/:userId', UserController.viewProfile);

  userRoutes.put('/:userId', UserController.updateEmail);
  userRoutes.post('/friendRequest', UserController.submitFriendRequest);
  userRoutes.post('/save/userFav', UserController.saveUserFav);
  userRoutes.get('/fav/:userId', UserController.getUserFav);
  userRoutes.post('/save/aboutMe', UserController.saveAboutme);
  userRoutes.put('/update/userFav/:id', UserController.updateUserFav);
  userRoutes.put('/update/aboutMe/:id', UserController.updateAboutme);
  
  userRoutes.get('/aboutme/:userId', UserController.getAboutme);
  userRoutes.delete('/fav/:id', UserController.deleteUserFav);

  userRoutes.post('/save/askPref', UserController.saveAskPref);
  userRoutes.get('/askPref/:userId', UserController.getAskPref);
  userRoutes.put('/update/askPref/:id', UserController.updateAskPref);
  // View user profile route
  userRoutes.get('/users/all', UserController.getUsers);
  userRoutes.put('/save/profileImage', UserController.saveprofileImage);
  userRoutes.get('/get/profileImage/:loginId', UserController.getprofileImage);

  userRoutes.put('/save/coverPhoto', UserController.saveCoverPhoto);
  userRoutes.get('/get/coverPhoto/:loginId', UserController.getCoverPhoto);

  // Test protected route
  apiRoutes.get('/protected', requireAuth, (req, res) => {
    res.send({ content: 'The protected test route is functional!' });
  });

  apiRoutes.get('/admins-only', requireAuth, AuthenticationController.roleAuthorization(ROLE_ADMIN), (req, res) => {
    res.send({ content: 'Admin dashboard is working.' });
  });

 apiRoutes.use('/general', generalRoutes);


  generalRoutes.post('/pageCategories', GeneralController.savePageCategories);

  generalRoutes.get('/pageCategories', GeneralController.getPageCategories);

  generalRoutes.post('/countries', GeneralController.saveCountries);

  generalRoutes.get('/countries', GeneralController.getCountries);

  generalRoutes.post('/saveUserPage', GeneralController.saveUserPageInfo);

  //= ========================
  // Chat Routes
  //= ========================

  // Set chat routes as a subgroup/middleware to apiRoutes
  apiRoutes.use('/chat', chatRoutes);

  // View messages to and from authenticated user
  chatRoutes.get('/', requireAuth, ChatController.getConversations);

  //chatRoutes.get('/recipients', requireAuth, ChatController.getRecipients);

  // Retrieve single conversation
  chatRoutes.get('/:conversationId', requireAuth, ChatController.getConversation);

  // Send reply in conversation
  chatRoutes.post('/:conversationId', requireAuth, ChatController.sendReply);

  // Start new conversation
  chatRoutes.post('/new/:recipient', requireAuth, ChatController.newConversation);

  //= ========================
  // Payment Routes
  //= ========================
  apiRoutes.use('/pay', payRoutes);

  // Webhook endpoint for Stripe
  payRoutes.post('/webhook-notify', StripeController.webhook);

  // Create customer and subscription
  payRoutes.post('/customer', requireAuth, StripeController.createSubscription);

  // Update customer object and billing information
  payRoutes.put('/customer', requireAuth, StripeController.updateCustomerBillingInfo);

  // Delete subscription from customer
  payRoutes.delete('/subscription', requireAuth, StripeController.deleteSubscription);

  // Upgrade or downgrade subscription
  payRoutes.put('/subscription', requireAuth, StripeController.changeSubscription);

  // Fetch customer information
  payRoutes.get('/customer', requireAuth, StripeController.getCustomer);

  //= ========================
  // Communication Routes
  //= ========================
  apiRoutes.use('/communication', communicationRoutes);

  // Send email from contact form
  communicationRoutes.post('/contact', CommunicationController.sendContactForm);

  // Set url for API group routes
  app.use('/api', apiRoutes);
};
