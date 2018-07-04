const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const UserCoverPhotoSchema = new Schema({
  loginId: {
    type: String,
    required: true,
    index:true,
    unique: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    index:true
  },
  fileType: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  fileData: {
    type: Buffer,
    required: true
  },
  contentType: {
    type: String,
    required: true
  }
},
  {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  });

module.exports = mongoose.model('User_Cover_Photo', UserCoverPhotoSchema);