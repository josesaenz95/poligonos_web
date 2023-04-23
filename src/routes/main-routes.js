const express = require('express');

const PageController = require('../app/controllers/PageController');
const router = express.Router();

router.get('/', PageController.renderLogin);
router.get('/inscription', PageController.renderInscription);

module.exports = router;