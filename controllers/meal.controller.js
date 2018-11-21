const Meal = require('../models/meal.model');
const createError = require('http-errors');
const User = require('../models/user.model')
const mongoose = require('mongoose');
const Review = require('../models/review.model')


// module.exports.list = (req, res, next) => {
//   Meal.find({ meals: mongoose.Types.ObjectId(req.params.mealsId) })
//   .then(meals => res.json(meals))
//     .catch(error => next(error));
// }

module.exports.list = (req, res, next) => {
  const criterial = {}
  // id => userId
  if (req.params.id) {
    criterial.user = req.params.userId;
  }
  Meal.find(criterial)
    .then(meals => res.json(meals))
    .catch(error => next(error));
},


module.exports.create = (req, res, next) => {
  console.log('meal.create-in')
  
  const meal = new Meal({
    name: req.body.name, 
    description: req.body.description, 
    price: req.body.price,
    user: req.body.user,
    tags: req.body.tags,
    images: req.body.images, 
    ingredients: req.body.ingredients
  } 

  
  // //meal.user = req.user._id
  //   //req.body
  // //   name: req.body.name, 
  // //   description: req.body.description, 
  // //   images: req.body.images, 
  // //   tags: req.body.tags,
  // //   ingredients: req.body.ingredients,
  // //   portions: req.body.portions,
  
  
  // ));
  
  ); 
  console. log("meal antes de save ------>", meal)
  console.log('meal.create-out')

  if (req.files) {
    meal.images=[];
    for (const file of req.files) {
      meal.images.push(`${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`);
    }
  };


  meal.save()
    .then(meal => res.status(201).json(meal))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  Meal.findById({ user: req.params.userId, _id: req.params.id })
    .populate('user')
    .populate({ path: 'comments', populate: { path: 'user' } })
    .then(meal => {
      if (!meal) {
        throw createError(404, 'Post not found');
      } else {
        res.json(meal);
      }
    })
    .catch(error => {
      next(error);
    });
}

module.exports.delete = (req, res, next) => {
  Meal.findOneAndDelete({ user: req.params.userId, _id: req.params.id })
    .then(meal => {
      if (!meal) {
        throw createError(404, 'Post not found');
      } else {
        res.status(204).json();
      }
    })
    .catch(error => next(error));
}