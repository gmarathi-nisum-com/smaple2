const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const Token = require('../models/token');
const mailgun = require('../config/mailgun');
// const mailchimp = require('../config/mailchimp');
const setUserInfo = require('../helpers').setUserInfo;
const getRole = require('../helpers').getRole;
const config = require('../config/main');
const nodemailer = require('nodemailer');

// Generate JWT
// TO-DO Add issuer and audience
function generateToken(user) {
  return jwt.sign(user, 'pemmasanidasari');
}


//= =======================================
// Login Route
//= =======================================
exports.login = function (req, res, next) {

  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).json({ authenticated: false, message: 'Email is not registered yet! Please Signup and try Signin' });
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
         if (!isMatch) return res.status(401).send({ message: 'Authentication failed! Incorrect Password!' });
        // Make sure the user has been verified
         if (!user.isVerified) return res.status(401).send({ type: 'not-verified', message: 'Your account has not been verified. Please check your email' }); 
        
        if (isMatch) {
           const userInfo = setUserInfo(user);
            console.log("userInfo: ", userInfo)
          res.status(200).json({
            token: `${generateToken(userInfo)}`,
            user: userInfo
          });
        }
      });
    }
  });
};

//= =======================================
// Registration Route
//= =======================================
exports.register = function (req, res, next) {
  // Check for registration errors
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const sex = req.body.sex;
  const dob = req.body.dob;
  // Return error if no email provided
  if (!email) {
    return res.status(422).json({ error: 'You must enter an email address.' });
  }

  // Return error if full name not provided
  if (!firstName || !lastName) {
    return res.status(422).json({ error: 'You must enter your full name.' });
  }

  if (!sex) {
    return res.status(422).json({ error: 'You must select your gender.' });
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).json({ error: 'You must enter a password.' });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) { 
      res.status(500).json({
        error: "Internal server Error! Unable to create an account"
      });
       return next(err); 
    }

      // If user is not unique, return error
    if (existingUser) {
      return res.status(400).json({ error: 'This email address is already in use. Please try another' });
    }else{
      // If email is unique and password was provided, create account
    const user = new User({
      email,
      password,
      firstName,
      lastName,
      sex: sex,
      dob: dob
    });

    user.save((err, user) => {
      if (err) {
       res.status(500).json({
        error: "Internal server Error! Unable to create an account"
      });
       return next(err); 
     }

        // Create a verification token for this user
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
        console.log("Token: ", token)
        // Save the verification token
        token.save(function (err) {
            if (err) { return res.status(500).json({ errors: err.message }); }
            // Send the email
            console.log("Register host: ", req.headers.origin)
            let url = `${req.headers.origin}/confirmation/${token.token}`;
            console.log("URL: ", url)
            const message = {
            subject: 'Account Verification',
            text: ``,
            html: `Hello ${firstName} ${lastName},<BR><BR>Please verify your account by clicking the link: <a href=${url}> Confirm your account</a><BR><BR>Thanks,<BR>Netext Team`
            };
            // Otherwise, send user email via Mailgun
          var response = mailgun.sendEmail(email, message);

          if (response == 'error') { 
            return res.status(500).json({ error: 'We are unable to send Verification email! Please try after sometime' }); 
          }else{
            res.status(200).json({success: 'A verification email has been sent to ' + email + '. Please activate and try login'});
          }
                
       // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created

      // const userInfo = setUserInfo(user);

      // res.status(201).json({
      //   success: 'A verification email has been sent to ' + user.email + '. Please activate and login',
      //   user: userInfo
      // });
          }); 
    });
  }
  });
};

//= =======================================
// Authorization Middleware
//= =======================================

// Role authorization check
exports.roleAuthorization = function (requiredRole) {
  return function (req, res, next) {
    const user = req.user;

    User.findById(user._id, (err, foundUser) => {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }

      // If user is found, check role.
      if (getRole(foundUser.role) >= getRole(requiredRole)) {
        return next();
      }

      return res.status(401).json({ error: 'You are not authorized to view this content.' });
    });
  };
};

//= =======================================
// Forgot Password Route
//= =======================================

exports.forgotPassword = function (req, res, next) {
  const email = req.body.email;
   console.log("Host111 name: ", req.headers.origin)
  User.findOne({email}, (err, existingUser) => {
    // If user is not found, return error
    if (err || existingUser == null) {
      res.status(422).json({ status: 422, error: 'The email you provided is not registered with us! Please create an account' });
      return next(err);
    }else{
      // If user is found, generate and save resetToken

      // Generate a token with Crypto
      crypto.randomBytes(48, (err, buffer) => {
        const resetToken = buffer.toString('hex');
        if (err) { return next(err); }

        existingUser.resetPasswordToken = resetToken;
        existingUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        existingUser.save((err) => {
            // If error in saving token, return it
           
          if (err) { return next(err); }
          let url = `${req.headers.origin}/resetpassword/${resetToken}`;
          // let transporter = nodemailer.createTransport({
          //     service: 'gmail',
          //     auth: {
          //         user: 'hemadri.dasari1990@gmail.email',
          //         pass: 'hemanth@@@'
          //     }
          // });
          // let mailOptions = {
          //         from: '"Do not reply", hemadri.dasari1990@gmail.com', // sender address
          //         to: existingUser.email, // list of receivers
          //         subject: 'Reset Password', // Subject line// plain text body
          //         html: `Hello, <BR><BR>You are receiving this email because you (or someone else) have requested the reset of the password for your account.<BR><BR>Please click on the following link, or paste this into your browser to complete the process:<a href=${url}>Reset Password</a><BR>` +
          //               `If you did not request this, please ignore this email and your password will remain unchanged.<BR>Please note this token will expire after an hour<BR><BR>
          //               Thanks,<BR>
          //               Netext Team` // html body
          //     };
          const message = {
            subject: 'Reset Password',
            text: '',
            html: `Hello, <BR><BR>You are receiving this email because you (or someone else) have requested the reset of the password for your account.<BR><BR>Please click on the following link, or paste this into your browser to complete the process:<a href=${url}>Reset Password</a><BR>` +
              `If you did not request this, please ignore this email and your password will remain unchanged.<BR>Please note this token will expire after an hour<BR><BR>
              Thanks,<BR>
              Netext Team`
          };

//           transporter.sendMail(mailOptions, (error, info) => {
//             console.log("Test")
//             if (error) {
//                 return res.status(500).send({ status: 500, error: 'We are unable to send password reset token! Please try after sometime' });;
//             }else{
//               return res.status(200).json({ status: 200, message: 'We have sent you an email! Please find the link to reset your password.' });
//             }
           
// console.log("Test")
//             console.log('Message sent: %s', info.messageId);
//             // Preview only available when sending through an Ethereal account
//             console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//             // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
//             // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//         });
            // Otherwise, send user email via Mailgun
          var response = mailgun.sendEmail(existingUser.email, message);
          if (response == 'error') { 
            return res.status(500).send({ status: 500, error: 'We are unable to send password reset token! Please try after sometime' });
          }else{
            return res.status(200).json({ message: 'We have sent you an email! Please find the link to reset your password.' });
          }
          
        });
      });
    }
  });
};

//= =======================================
// Reset Password Route
//= =======================================

exports.verifyToken = function (req, res, next) {
  var password = req.body.password
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, resetUser) => {
    // If query returned no results, token expired or was invalid. Return error.
    if (!resetUser) {
      res.status(400).json({ status: 400, error: 'Your token has expired. Please resend token to reset your password.' });
    }
console.log("password: ", password)
      // Otherwise, save new password and clear resetToken from database
    resetUser.password = password;
    resetUser.resetPasswordToken = undefined;
    resetUser.resetPasswordExpires = undefined;

    resetUser.save((err) => {
      if (err) { return next(err); }

        // If password change saved successfully, alert user via email
      const message = {
        subject: 'Password Changed',
        text: '',
        html: 'Hello,<BR><BR> You are receiving this email because you changed your password. <BR>' +
          'If you did not request this change, please contact us immediately.<BR><BR>Thanks,<BR>Netext Team'
      };

        // Otherwise, send user email confirmation of password change via Mailgun
      var response = mailgun.sendEmail(resetUser.email, message);
          if (response == 'error') {
            return res.status(500).json({ status: 500, error: 'We are unable to verify this token! Please try again' }); 
          }else{
            return res.status(200).json({ status: 200, message: 'Password changed successfully. Please login with your new password.' });
          }
      
    });
  });
};


//= =======================================
// Account verification
//= =======================================

exports.confirmation = function (req, res, next) {
    // Find a matching token
    Token.findOne({ token: req.body.token }, function (err, token) {
        if (!token) return res.status(400).json({ type: 'not-verified', message: 'We are unable to find a valid token. Your token my have expired. Please request a new token below' });
 
        // If we found a token, find a matching user
        User.findOne({ _id: token._userId }, function (err, user) {
            if (!user) return res.status(400).json({ message: 'We are unable to find a user for this token.' });
            if (user.isVerified) return res.status(400).json({ type: 'already-verified', message: 'This user has already been verified.' });
 
            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).json({ message: err.message }); }
                res.status(200).json({ type: 'verified', message: 'The account has been verified. Please login.'});
            });
        });
    });
};



/**
* POST /resend
*/
exports.resendToken = function (req, res, next) { 
    console.log("Email from req body: ", req.body.email)
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(401).json({ status: 401, message: 'We are unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).json({ status: 400, message: 'This account has already been verified. Please log in.' });
 
        // Create a verification token, save it, and send email
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
        token.save(function (err) {
            if (err) { return res.status(500).json({ status: 500, errors: err.message }); }
            let url = `${req.headers.origin}/confirmation/${token.token}`;
            // Send the email
            const message = {
            subject: 'Account Verification',
            text: `Hello ${firstName} ${lastName},<BR><BR>
              Please verify your account by clicking the link: <a href=${url}>Reset Password</a><BR><BR> Thanks,<BR>Netext Team`
            };
            // Otherwise, send user email via Mailgun
          var response = mailgun.sendEmail(email, message);

          if (response == 'error') { 
            return res.status(500).json({ status: 500, message: 'We are unable to send Verification email! Please try after sometime' }); 
          }else{
            res.status(200).json({status: 200, success: 'A verification email has been sent to ' + email + '. Please activate and try login'});
          }
                
       // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created

      // const userInfo = setUserInfo(user);

      // res.status(201).json({
      //   success: 'A verification email has been sent to ' + user.email + '. Please activate and login',
      //   user: userInfo
      // });
          });
 
    });
};
