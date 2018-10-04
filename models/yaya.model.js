const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const yayaSchema =  new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },

  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
    }
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  }, 

  meals: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Meal',
  },

}, { 
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      if (!ret['posts']) {
        ret.posts = [];
      }
      return ret;
    }
  }
});

  yayaSchema.virtual('meals', {
    ref: 'Meal',
    localField: '_id',
    foreignField: 'user',
    options: { sort: { createdAt: -1 }, limit: 20 }
  });

