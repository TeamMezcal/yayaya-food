const express = require('express');
const router = express.Router({ mergeParams: true });
const meals = require('../controllers/meal.controller');
const secure = require('../middleware/secure.middleware');
const user = require('../middleware/user.middleware');
const reviews = require('../controllers/review.controller');
const uploader = require('./../configs/multer.config');

router.get('/', meals.list);
router.post('/', uploader.array('images'), meals.create);
router.get('/:id', meals.get);
router.delete('/:id', meals.delete);

module.exports = router;
