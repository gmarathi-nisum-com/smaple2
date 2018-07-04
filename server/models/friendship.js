const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const FriendshipSchema = new Schema({
  requester: {
    type: String,
    required: true
  },
  recipient: {
    type: String,
    required: true
  },
    status: {
    type: Number,
    required: true
  }
},
  {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  });

FriendshipSchema.pre('save', function (next) {
  next();
});

module.exports = mongoose.model('Friendship', FriendshipSchema);