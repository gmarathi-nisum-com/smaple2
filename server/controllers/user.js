const User = require('../models/user');
const setUserInfo = require('../helpers').setUserInfo;
const UserFav = require('../models/userFav');
const FriendshipSchema = require('../models/friendship');
const UserAboutme = require('../models/userAboutme');
const UserAskPref = require('../models/userAskPref');
const setUserFavInfo = require('../helpers').setUserFavInfo;
const Post = require('../models/post');
const setPostInfo = require('../helpers').setPostInfo;
const SaveProfileImage = require('../models/userProfile');
const SaveCoverPhoto = require('../models/userCoverPhoto');
//= =======================================
// User Routes
//= =======================================
exports.viewProfile = function (req, res, next) {
  const userId = req.params.userId;

  User.findById(userId, (err, user) => {
    if (err) {
      res.status(400).json({ authenticated: false, error: 'No user could be found for this ID.' });
      return next(err);
    }

    const userToReturn = setUserInfo(user);

    return res.status(200).json({ user: userToReturn, message: "Login Successfull", authenticated: true });
  });
};

exports.getUsers = function (req, res, next) {
  // let searchText = req.query.searchText;
  // // let lastName = req.query.searchText;
  // var pattern = `/$searchText/`
  User.find({isVerified: true}, (err, users) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error.' });
      return next(err);
    }

    return res.status(200).json({ users: users }); 
  });
};

exports.updateEmail = function(req, res, next){
  User.findById(req.params.userId, function(err, user) {
    if (err) throw err;

    // change the users location
    user.email = req.body.email;

    // save the user
    user.save(function(err) {
     if (err) {
      res.status(500).json({ error: 'Internal server error! Couldnt update Email!' });
      return next(err);
    }

    return res.status(200).json({ message: "Email updated successfully" }); 
    });

  });
}

exports.saveUserFav = function (req, res, next) {

  const name = req.body.name;
  const value = req.body.value;
  const userId = req.body.userId;
      
    const userFav = new UserFav({
      name,
      value,
      userId
    });

    userFav.save((err, user) => {
      if (err) { 
         res.status(500).json({
        message: 'Internal Server error! Cannot save your record. Please try after sometime!'
      });
        
      }else{
        // console.log("User: ", user)
        res.status(201).json({
        message: 'Favorite record saved successfully',
        user: user
      });
      }
      
    });
};

exports.getUserFav = function (req, res, next) {
  const userId = req.params.userId;

  UserFav.find({userId}, (err, userFavorites) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server error! Cannot pull your favorites. Please try after sometime!'});
      return next(err);
    }
    // console.log("User fav: ", userFavorites)

    // const UserFavInfo = setUserFavInfo(userFavorites);

    return res.status(200).json({ user: userFavorites, message: "Favorites loaded successfully"});
  });
};


exports.deleteUserFav = function (req, res, next) {
  // Look up the user requesting a subscription change
  UserFav.findOneAndRemove({_id: req.params.id}, (err, userToChange) => {
    if (err) {
       res.status(500).json({ message: 'Internal Server error! Cannot deleted requested favorite. Please try after sometime!'});
      return next(err);
    }else{
      return res.status(200).json({message: "Favorite has been deleted successfully"});
    }
  });
    
};

exports.updateUserFav = function(req, res, next){
  UserFav.findById(req.params.id, function(err, userFav) {
    if (err) throw err;

    if(!userFav) {
      return res.status(404).json({
        message: `Id ${req.params.id} can not be found.`
      });
    }
    let data = {};
    data.name = req.body.name;
    data.value = req.body.value;
    userFav.update( data, function(err, userfav) {
     if (err) {
      res.status(500).json({ message: `Internal server error! Couldnt update Name - ${req.body.name} and value - ${req.body.value}` });
      return next(err);
    }else{
      return res.status(200).json({ userfav: userfav, message: `Record updated successfully Name - ${req.body.name} and value - ${req.body.value}` }); 
    }
    
    });

  });
}
exports.saveAboutme = function (req, res, next) {

  const aboutMe = req.body.aboutMe;
  const userId = req.body.userId;
      
    const userAboutme = new UserAboutme({
      aboutMe,
      userId
    });

    userAboutme.save((err, user) => {
      if (err) { 
         res.status(500).json({
        message: 'Internal Server error! Cannot save your record. Please try after sometime!'
      });
        
      }else{
        // console.log("User: ", user)
        res.status(201).json({
        message: 'About you saved successfully',
        user: user
      });
      }
      
    });
};

exports.getAboutme = function (req, res, next) {
  const userId = req.params.userId;

  UserAboutme.find({userId}, (err, Aboutme) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server error! Cannot pull your favorites. Please try after sometime!'});
      return next(err);
    }
    // console.log("User Aboutme: ", userId)

    // const UserFavInfo = setUserFavInfo(userFavorites);

    return res.status(200).json({ userAboutme: Aboutme, message: "About you loaded successfully"});
  });
};

exports.updateAboutme = function(req, res, next){
  UserAboutme.findById(req.params.id, function(err, aboutme) {
    if (err) throw err;

    if(!aboutme) {
      return res.status(404).json({
        message: `Id ${req.params.id} can not be found.`
      });
    }
    aboutme.update( {aboutMe: req.body.aboutMe}, function(err, aboutme) {
     if (err) {
      res.status(500).json({ message: 'Internal server error! Couldnt update About you' });
      return next(err);
    }else{
      return res.status(200).json({ userAboutme: aboutme, message: "Record updated successfully" }); 
    }
    
    });

  });
}

exports.submitFriendRequest = function (req, res, next) {

  const requester = req.body.loginId;
  const recipient = req.body.friendId;
  const status = 1;
      
    const friendshipSchema = new FriendshipSchema({
      requester,
      recipient,
      status
    });

    friendshipSchema.save((err, friendshipObject) => {
      if (err) { 
         res.status(500).json({
        message: 'Internal Server error! Cannot send friend request. Please try after sometime!'
      });
        
      }else{
        // console.log("res: ", res)
        res.status(201).json({
        message: 'Friend request sent successfully',
        friendshipObject: friendshipObject
      });
      }
      
    });
};

exports.saveAskPref = function (req, res, next) {

    const positive = req.body.positive;
    const negative = req.body.negative;
    const advice = req.body.advice;
    const userId = req.body.userId;
      
    const userAskPref = new UserAskPref({
      positive,
      negative,
      advice,
      userId
    });

    userAskPref.save((err, user) => {
      if (err) { 
         res.status(500).json({
        message: 'Internal Server error! Cannot save your record. Please try after sometime!'
      });
        
      }else{
        // console.log("User: ", user)
        res.status(201).json({
        message: 'Ask Preferences are saved successfully',
        user: user
      });
      }
      
    });
};

exports.getAskPref = function (req, res, next) {
  const userId = req.params.userId;

  UserAskPref.find({userId}, (err, AskPref) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server error! Cannot pull your favorites. Please try after sometime!'});
      return next(err);
    }
    // console.log("User AskPref: ", userId)

    // const UserFavInfo = setUserFavInfo(userFavorites);

    return res.status(200).json({ userAskPref: AskPref, message: "Ask preferences are loaded successfully"});
  });
};

exports.updateAskPref = function(req, res, next){
  UserAskPref.findById(req.params.id, function(err, askPref) {
    if (err) throw err;

    if(!askPref) {
      return res.status(404).json({
        message: `Id ${req.params.id} can not be found.`
      });
    }
    askPref.update( {positive: req.body.positive, negative: req.body.negative, advice: req.body.advice}, function(err, aboutme) {
     if (err) {
      res.status(500).json({ message: 'Internal server error! Couldnt update preferences' });
      return next(err);
    }else{
      return res.status(200).json({ userAskPref: askPref, message: "Record updated successfully" }); 
    }
    
    });

  });
}

exports.addPost = function (req, res, next) {
  const positive = req.body.positive;
  const negative = req.body.negative;
  const advice = req.body.advice;
  const postedTo = req.body.postedTo;
  const postedBy = req.body.postedBy;
    const post = new Post({
      positive,
      negative,
      advice,
      postedTo,
      postedBy
    });

    post.save((err, post) => {
      if (err) { 
        res.status(500).json({ message: 'Internal server error! Couldnt post it. Please try later' });
        return next(err); 
      }
      const postInfo = setPostInfo(post);
      res.status(201).json({
        postResponse: postInfo,
        message: 'Post saved successfully and will be notified to recipient',
      });
    });
};

exports.getPostData = function (req, res, next) {
  const postedTo = req.query.postedTo;
  const postedBy = req.query.postedBy;
  Post.find({'postedTo': postedTo, 'postedBy': postedBy}, (err, postData) => {
    if (err) {
      res.status(500).json({ message: 'Internal Server error! Cannot fetch post details. Please try after sometime!'});
      return next(err);
    }
    return res.status(200).json({ postData: postData, message: "Post loaded successfully"});
  });
};

exports.saveprofileImage = function(req, res, next){
    const loginId = req.body.loginId;
    const email = req.body.email;
    const fileData = req.body.fileData.data;
    const fileSize = req.body.fileSize;
    const fileType = req.body.fileType;
    const contentType = req.body.contentType;
    //  const saveProfileImage = new SaveProfileImage({
    //   loginId,
    //   email,
    //   fileType,
    //   fileSize,
    //   fileData,
    //   contentType
    // });

    let query = {loginId : loginId},
    update = { expire: new Date(), loginId : loginId, email:email, fileType:fileType, fileSize: fileSize, fileData: fileData, contentType:contentType },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

    SaveProfileImage.findOneAndUpdate( query, update, options, (err, userProfile) => {
     if (err) {
      res.status(500).json({ message: `Internal server error! Couldnt insert/update Profile picture` });
      return next(err);
    }else{
      return res.status(200).json({ message: `Profile Picture inserted/updated successfully` }); 
    }
    });
}

exports.getprofileImage = function(req, res, next){
    SaveProfileImage.find( { loginId : req.params.loginId }, (err, userProfile) => {
      if (err) {
        res.status(500).json({ message: `Internal server error! Couldnt read Profile picture` });
        return next(err);
      }else{
        return res.status(200).json({ userProfile: userProfile, message: `Profile Picture retrieved successfully` }); 
      }
    });
}

exports.saveCoverPhoto = function(req, res, next){
    const loginId = req.body.loginId;
    const email = req.body.email;
    const fileData = req.body.fileData.data;
    const fileSize = req.body.fileSize;
    const fileType = req.body.fileType;
    const contentType = req.body.contentType;

    let query = {loginId : loginId},
    update = { expire: new Date(), loginId : loginId, email:email, fileType:fileType, fileSize: fileSize, fileData: fileData, contentType:contentType },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

    SaveCoverPhoto.findOneAndUpdate( query, update, options, (err, coverPhoto) => {
     if (err) {
      res.status(500).json({ message: `Internal server error! Couldnt insert/update cover photo` });
      return next(err);
    }else{
      return res.status(200).json({ message: `Profile Picture inserted/updated successfully` }); 
    }
    });
}

exports.getCoverPhoto = function(req, res, next){
    SaveCoverPhoto.find( { loginId : req.params.loginId }, (err, coverPhoto) => {
      if (err) {
        res.status(500).json({ message: `Internal server error! Couldnt read cover photo` });
        return next(err);
      }else{
        return res.status(200).json({ coverPhoto: coverPhoto, message: `Profile Picture retrieved successfully` }); 
      }
    });
}