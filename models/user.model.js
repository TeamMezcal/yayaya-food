const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema =  new mongoose.Schema({

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
  }
},
  
{ 
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
      if (!ret['meals']) {
        ret.posts = [];
      }
      return ret;
    }
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User; 