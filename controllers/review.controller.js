const Review = require('../models/review.model')
const createError = require('http-errors');
const mongoose = require('mongoose'); 


module.exports.create = (req, res, next) => {
  const review = new Review(req.body);
  review.user = req.user._id;
  review.meal = req.params.mealId;

  review.save()
    .then(review => res.status(201).json(review))
    .catch(error => next(error));
}

module.exports.listByMeal = (req, res, next) => {
  const criterial = {}
  if (req.params.id) {
    criterial.meal = req.params.id
  } 
  Review.find(criterial)
  .then(meals => res.json(meals))
  .catch(error => next(error));
},


module.exports.delete = (req, res, next) => {
  Review.findOneAndRemove(req.params.id)
    .then(review => {
      if (!review) {
        throw createError(404, 'Review not found');
      } else {
        res.status(204).json();
      }
    })
    .catch(error => next(error));
  }
  