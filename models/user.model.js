const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const passport = require('passport')

const userSchema =  new mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true
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

  meals: [{
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Meals',
  }],
  
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
  
},{ 
  timestamps: true,
  toObject: {
    virtuals: true
  },
  // toJSON: {
  //   virtuals: true,
  //   transform: (doc, ret) => {
  //     ret.id = doc._id;
  //     delete ret._id;
  //     delete ret.__v;
  //     //delete ret.password;
  //     if (!ret['meals']) {
  //       ret.posts = [];
  //     }
  //     return ret;
  //   }
  // }
});

userSchema.index({ "location": "2dsphere" });


userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    next();
  } else {
    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => {
        return bcrypt.hash(user.password, salt)
      })
      .then(hash => {
        user.password = hash;
        next();
      })
      .catch(error => next(error));
  }
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password)
}; 

const User = mongoose.model('User', userSchema);
module.exports = User; 