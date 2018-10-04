const mongoose = require('mongoose');
const User = require('../models/user.model');
const Meal = require('../models/meal.model');
const Review = require('../models/review.model');
const createError = require('http-errors');

module.exports.list = (req, res, next) => {
  Meal.find()
    .populate({ path: 'yaya', select: 'id' })
    .then(meals => res.json(meals))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  Meal.findById(req.params.id)
    .populate('yaya')
    .then(meal => res.json(meal))
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
