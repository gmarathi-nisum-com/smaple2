const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const UserPageInfoSchema = new Schema({
  pageTitle: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },  
  subCategory: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  pageProfilePhoto:{
    fileName: {type: String},
    fileType: {type: String},
    fileSize: {type: Number},
    fileData: {type: Buffer},
    contentType: {type: String}
  },
  pageCoverPhoto:{
    fileName: {type: String},
    fileType: {type: String},
    fileSize: {type: Number},
    fileData: {type: Buffer},
    contentType: {type: String}
  }
},
  {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  });

module.exports = mongoose.model('User_Page_Info', UserPageInfoSchema);