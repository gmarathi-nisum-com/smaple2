const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const userAskPrefSchema = new Schema({
  positive: {
    type: String
  },
  negative: {
    type: String
  },
  advice: {
    type: String
  },
  userId: {
    type: String,
    unique:true,
    index:true
  }
},
  {
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
  });


userAskPrefSchema.pre('save', function (next) {
  next();
});

module.exports = mongoose.model('User_AskPref', userAskPrefSchema);