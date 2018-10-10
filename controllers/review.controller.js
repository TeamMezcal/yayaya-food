const Review = require('../models/review.model')
const createError = require('http-errors');
const mongoose = require('mongoose'); 
const User = require('../models/user.model')

module.exports.create = (req, res, next) => {
  const review = new Review(req.body);
  review.user = req.user._id;
  review.meal = req.params.id;

  review.save()
    .then(review => res.status(201).json(review))
    .catch(error => next(error));
}

