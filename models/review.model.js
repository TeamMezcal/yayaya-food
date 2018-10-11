const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: {
    type: String, 
    required: [true, 'The fooking title is required']
  }, 

  content: {
    type: String,
    required: [true, 'The comment content is required']
  },

  rating: {
    type: Number, 
    required: [true, "Rate from 1 to 5 stars "], 
    min: 1,
    max: 5
  }, 
  meal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal',
    required: [true, `Review needs a meal`]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, `Review needs an owner`]
  }
}, { 
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;      
      return ret;
    }
  }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;