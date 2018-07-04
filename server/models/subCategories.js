const mongoose = require('mongoose'),
  Schema = mongoose.Schema;



const subCategories = new Schema({
  name: {type: String, required: true, trim: true},
  value: {type: Number, required: true}
});


module.exports = mongoose.model('Page_Sub_Categories', subCategories);