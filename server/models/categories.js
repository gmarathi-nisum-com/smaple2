const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CategorySchema = new Schema({
      categories:[{
        name: {
          type: String, 
          required: true, 
          trim: true
        },
        value: {
          type: Number, 
          required: true
        },
        createdAt: {
          type: Date, 
          default: Date.now
        },
        updatedAt: {
          type: Date, 
          default: Date.now
        },
        subCategories:  [{
          name: {
            type: String, 
            required: true, 
            trim: true
          },
          value: {
            type: Number, 
            required: true
          }
        }] 
    }]
})

module.exports = mongoose.model('Page_Categories', CategorySchema);