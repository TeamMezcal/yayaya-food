const mongoose = require('mongoose');
const User = require('../models/user.model');
const Meal = require('../models/meal.model');
const Review = require('../models/review.model');
const createError = require('http-errors');
const templates = require('./../templates/template')


module.exports.list = (req, res, next) => {
  User.find()
  //  .populate({ path: 'reviews', select: 'id' })
    .then(users => res.json(users))
    .catch(error => next(error));
}


module.exports.activate = (req, res, next) => {
  let { email} = req.body;
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your email address',
      pass: 'your email password'
    }
  });
  transporter.sendMail({
    from: '"Yayaya Activator 👻" <activator@yayaya.com>',
    to: email, 
    subject: Activation, 
    text: message,
    html: templates.templateRegister(message),
  })
  .then(info => res.render('message', {email, subject, message, info}))
  .catch(error => console.log(error));
}

// module.exports.listByUser = (req, res, next) => {
//   const userId = req.params.id;
//   console.log("PARAMS!!!!!!------->" ,req.params.id)
 
//   Meal.find({ userId })
//     .then(meals => {
//       res.json(meals);
//     })
//     .catch(error => next(error));
//  };


module.exports.listByUser = (req, res, next) => {
  const userId = req.params.id  
  Meal.find({ user: userId })
    .then(meals => {
        console.log('Meals: ', meals)
        res.json(meals)
      })
    .catch(error => next(error))
}


module.exports.mealByUser = (req, res, next) => {
  
}

module.exports.get = (req, res, next) => {
  User.findById(req.params.id)
    //.populate('meals')
    .then(user => res.json(user))
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        throw createError(409, `User with email ${req.body.email} already exists`);
      } else {
        user = new User(req.body);
        user.save()
          .then(user => res.status(201).json(user))
          .catch(error => {
            next(error)
          });
      }
    })
    .catch(error => next(error));
}


module.exports.delete = (req, res, next) => {
  User.findByIdAndRemove(req.params.id) 
    .then(user => {
      if (!user) {
        next(createError(404, 'User not found'));
      } else {
        res.redirect('/users');
      }
    })
    .catch(error => next(error));
 }


// module.exports.delete = (req, res, next) => {
//   Promise.all([
//     User.findByIdAndDelete(req.user.id),
//     Review.deleteMany({ user: mongoose.Types.ObjectId(req.params.userId)})])
//     .then(([user]) => {
//       if (!user) {
//         throw createError(404, 'User not found');
//       } else {
//         res.status(204).json();
//       }
//     })
//     .catch(error => next(error));
// }