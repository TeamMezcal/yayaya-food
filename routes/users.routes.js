const express = require('express');
const router = express.Router();
const users = require('../controllers/user.controller');
const secure = require('../middleware/secure.middleware');
const user = require('../middleware/user.middleware');

router.post('/', users.create);
router.post('/activate', users.activate)
router.get('/', users.list);
router.get('/:id',  users.get)

router.get('/:id/meals',  users.listByUser)
//router.get('/:id/meals/:id',  users.mealByUser)

router.delete('/:id', users.delete)

module.exports = router;

