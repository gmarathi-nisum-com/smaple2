const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const UserFavSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
    userId: {
    type: String
  }
},
  {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  });


UserFavSchema.pre('save', function (next) {
  next();
});

module.exports = mongoose.model('User_Favorites', UserFavSchema);