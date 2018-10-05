const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The meal name is required']
  },
  description: {
    type: String,
    required: [true, 'The meal description is required']
  },
  images: {
    type: [String],
    default: []
  },
  tags: {
    type: [String],
    default: []
  },
  ingredients: {
    type: [String],
    default: []
  }, 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    //required: [true, `Meal needs a yaya`]
  }
}, { 
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON:  {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      if (!ret['comments']) {
        ret.comments = [];
      }  
      return ret;
    }
  }
});


mealSchema.index({ "location": "2dsphere" });


const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
