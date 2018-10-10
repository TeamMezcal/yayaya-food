const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/review.controller');
const secure = require('../middleware/secure.middleware');

//router.post('/', reviews.create);
//router.delete('/:id', reviews.delete);



module.exports = router;