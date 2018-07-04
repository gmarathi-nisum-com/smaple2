const Post = require('../models/post');
const setPostInfo = require('../helpers').setPostInfo;
exports.post = function (req, res, next) {
  // Check for registration errors
  const positive = req.body.positive;
  const negative = req.body.negative;
  const advice = req.body.advice;

      // If email is unique and password was provided, create account
    const post = new Post({
      positive,
      negative,
      advice
    });

    post.save((err, post) => {
      if (err) { return next(err); }

        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created

      const postInfo = setPostInfo(post);

      res.status(201).json({
        user: postInfo
      });
    });
};