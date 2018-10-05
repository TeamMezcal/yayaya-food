const Review = require('../models/review.model')
const createError = require('http-errors');
const mongoose = require('mongoose'); 

module.exports.create = (req, res, next) => {
  const review = new Review(req.body);
  //review.user = req.user.id;
  review.meal = req.params.mealId;

  comment.save()
    .then(review => res.status(201).json(review))
    .catch(error => next(error));
}