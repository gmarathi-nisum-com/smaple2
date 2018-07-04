const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const PostSchema = new Schema({
  positive: {
    type: String
  },
  negative: {
    type: String
  },
  advice: {
    type: String
  },
  postedTo: {
    type: String,
    required: true,
    index: true
  },
  postedBy: {
    type: String,
    required: true,
       index: true
  }
},
  {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  });

module.exports = mongoose.model('Post', PostSchema);