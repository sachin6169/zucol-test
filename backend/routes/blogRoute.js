const express = require('express');
const blogController = require('../controllers/blog');

const router = express.Router();

router.get('/', blogController.getListing);
router.post('/create', blogController.create);

module.exports = router;