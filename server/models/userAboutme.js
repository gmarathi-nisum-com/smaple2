const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const userAboutmeSchema = new Schema({
  aboutMe: {
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


userAboutmeSchema.pre('save', function (next) {
  next();
});

module.exports = mongoose.model('User_Aboutme', userAboutmeSchema);